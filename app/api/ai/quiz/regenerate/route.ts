import { fetchChatCompletion } from "@/lib/perplexityAPI";
import { db } from "@/db/index";
import { quizzes, transcripts } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { auth } from "auth";

const quizDataMapping: Record<string, string> = {
  "1": "quizDataTest",
  "5": "quizDataShort",
  "10": "quizDataMedium",
  "20": "quizDataLarge",
  "30": "quizDataExam",
};

export async function POST(request: Request) {
  try {
    const { numQuestions, videoTitle } = await request.json();

    console.log(`${numQuestions} AND ${videoTitle}`)

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
    const transcriptNeeded = await db.select({ content: transcripts.content, videoId: transcripts.videoId }).from(transcripts).where(and(eq(transcripts.userId, sessionUser.id), eq(transcripts.videoId, videoTitle)
    )).limit(1);

    console.log(`${sessionUser.id} AND ${transcriptNeeded}`)
    

    if (transcriptNeeded.length === 0) {
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
    const { videoId, content } = transcriptNeeded[0];
    
    console.log(`${videoId}`)
    
    console.log(`${quizDataMapping} ✅✅AND ${numQuestions}`)
    const quizDataNumQuestions = quizDataMapping[numQuestions];
    console.log(quizDataNumQuestions)
    const test = '5'

    
    const requestData = {
      model: "mixtral-8x22b-instruct",
      messages: [
        {
          role: "system",
          content: `Generate a multiple choice quiz from the provided transcript with exactly ${test} questions. Each question should have one correct answer among four options. Format the output as JSON: [{"question": "Q", "choices": ["A", "B", "C", "D"], "correct_answer": "A"}, ...]. Only JSON output is required.`,
        },
        { role: "user", content: content },
      ],
    };

    const response = await fetchChatCompletion(requestData);
    const quizContent = response.choices[0].message.content;
    console.log(`☑️ Quiz has been generated successfully as '${videoId}`);

    let quizDataField:
      | "quizDataShort"
      | "quizDataMedium"
      | "quizDataLarge"
      | "quizDataExam"
      | "quizDataTest";

    if (numQuestions === "5") {
      quizDataField = "quizDataShort";
    } else if (numQuestions === "10") {
      quizDataField = "quizDataMedium";
    } else if (numQuestions === "20") {
      quizDataField = "quizDataLarge";
    } else if (numQuestions === "35") {
      quizDataField = "quizDataExam";
    } else if (numQuestions === "1") {
      quizDataField = "quizDataTest";
    } else {
      throw new Error("Wrong number of question");
    }

    const existingQuiz = await db
      .select()
      .from(quizzes)
      .where(
        and(
          eq(quizzes.userId, sessionUser.id),
          eq(quizzes.videoId, videoTitle),
        ),
      )
      .limit(1);

    let quizId: string | undefined;

    if (existingQuiz.length > 0) {
      quizId = existingQuiz[0].id;
      await db
        .update(quizzes)
        .set({
          [quizDataField]: quizContent,
          updatedAt: new Date(),
        })
        .where(eq(quizzes.id, quizId));
      console.log("🆙 Quiz has been updated successfully");
      return new Response(
        JSON.stringify({
          message: "Quiz has been updated successfully",
          videoId: videoTitle,
          quizDataField: quizDataField,
          content: quizContent,
        }),
        {
          status: 201,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    } else {
      await db.insert(quizzes).values({
        userId: sessionUser.id,
        videoId: videoTitle,
        [quizDataField]: quizContent,
      }).execute()
      console.log("✅ Quiz has been stored successfully");

    return new Response(
        JSON.stringify({
          message: "Quiz has been stored successfully",
          videoId: videoTitle,
          quizDataField: quizDataField,
          content: quizContent,
        }),
        {
          status: 201,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
  } catch(error: any) {
    console.log("Error in POST route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch chat completion" }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
}
