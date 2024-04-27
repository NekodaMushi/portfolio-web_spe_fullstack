import { fetchChatCompletion } from "@/lib/perplexityAPI";
import { db } from "@/db/index";
import { quizzes, transcripts } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { auth } from "auth";


export async function POST(request: Request) {
  try {
    // -- Auth and get user from session --
    const session = await auth();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "content-type": "application/json",
        },
      });
    }

    const sessionUser = session?.user;

    // -- Fetch last transcript from DB --
    const lastTranscript = await db
      .select({
        videoId: transcripts.videoId,
        content: transcripts.content,
      })
      .from(transcripts)
      .where(eq(transcripts.userId, sessionUser.id))
      .orderBy(desc(transcripts.createdAt))
      .limit(1);

    if (lastTranscript.length === 0) {
      return new Response(
        JSON.stringify({ message: "No transcripts found for the user" }),
        {
          status: 404,
          headers: {
            "content-type": "application/json",
          },
        },
      );
    }

    const { videoId, content } = lastTranscript[0];
    const transcriptString = content;
    const videoTitle = videoId;

    // Check if a quiz already exists for the user and video
    const existingQuiz = await db
      .select()
      .from(quizzes)
      .where(and(
        eq(quizzes.userId, sessionUser.id),
        eq(quizzes.videoId, videoTitle)
      ))
      .limit(1);

    if (existingQuiz.length > 0) {
      console.log("⚠️ Quiz already exists for the user with the same videoId");
      return new Response(JSON.stringify(existingQuiz[0].quizData), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    }

    // ---- Sending to AI ----
    const requestData = {
      model: "mistral-7b-instruct",
      messages: [
        {
          role: "system",
          content:
            "Generate a multiple choice quiz based on the provided transcript, with at least 2 questions. Ensure there is only one correct answer out of the four options. The quiz should be in json format with 4 choices for each question, with the correct answer marked as correct_answer property,YOUR ANSWER IS ONLY A JSON, NO ADDITIONNAL TEXT ALLOWED",
        },
        { role: "user", content: transcriptString },
      ],
    };
    // console.log('CALLING AI');
    const response = await fetchChatCompletion(requestData);
    const quizContent = response.choices[0].message.content;
    const quizData = JSON.parse(quizContent);


    // -- Store the quiz in the database --
    await db.insert(quizzes).values({
      userId: sessionUser.id,
      quizData: quizData,
      videoId: videoTitle,
    });
    console.log("✅ Quiz has been stored successfully");

    const quiz = new Response(quizContent, { status: 200 });
    console.log(`☑️ Quiz has been generated successfully as '${videoTitle}`);

    return quiz;
  } catch (error: any) {
    if (error.code === '23505' && error.message.includes('user_video_id_unique')) {
      console.log("🐛 Trying to save a second time for unknown reason but unique constraint stopped, maybe ");
      return new Response(
        JSON.stringify({ error: "Quiz already exists for the user and video" }),
        { status: 409, headers: { 'content-type': 'application/json' } }
      );
    } else {
      console.log("Error in POST route:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch chat completion" }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      );
    }
  }
}
