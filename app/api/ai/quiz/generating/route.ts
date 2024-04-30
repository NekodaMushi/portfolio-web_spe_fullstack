import { fetchChatCompletion } from "@/lib/perplexityAPI";
import { db } from "@/db/index";
import { quizzes, transcripts } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { auth } from "auth";

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const numQuestions = url.searchParams.get('numQuestions') || '5';  
    

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
    console.log(numQuestions);

    const requestData = {
      model: "mixtral-8x22b-instruct",
      messages: [
        {
          role: "system",
          content:
            `Generate a multiple choice quiz from the provided transcript with exactly ${numQuestions} questions. Each question should have one correct answer among four options. Format the output as JSON: [{"question": "Q", "choices": ["A", "B", "C", "D"], "correct_answer": "A"}, ...]. Only JSON output is required.`,
        },
        { role: "user", content: transcriptString },
      ],
    };

    const response = await fetchChatCompletion(requestData);
    const quizContent = response.choices[0].message.content;
    const quizData = JSON.parse(quizContent);

    const quiz = new Response(quizContent, { status: 200 });
    console.log(`☑️ Quiz has been generated successfully as '${videoTitle}`);

    db.insert(quizzes).values({
      userId: sessionUser.id,
      quizData: quizData,
      videoId: videoTitle,
    }).then(() => {
      console.log("✅ Quiz has been stored successfully");
    }).catch((error) => {
      console.log("Error storing quiz in the database:", error);
    });

    return quiz;
  } catch (error: any) {
    console.log("Error in POST route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch chat completion" }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
