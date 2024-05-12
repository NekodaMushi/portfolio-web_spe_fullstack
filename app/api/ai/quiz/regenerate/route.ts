import { fetchChatCompletion } from "@/lib/perplexityAPI";
import { db } from "@/db/index";
import { quizzes, transcripts } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { auth } from "auth";

const inverseQuizDataMapping: Record<string, string> = {
  "quizDataTest": "1",
  "quizDataShort": "5",
  "quizDataMedium": "10",
  "quizDataLarge": "20",
  "quizDataExam": "30",
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
    const numberQuestions = inverseQuizDataMapping[numQuestions];
    
    const requestData = {
      model: "mixtral-8x22b-instruct",
      messages: [
        {
          role: "system",
          content: `Generate a multiple choice quiz from the provided transcript with exactly ${numberQuestions} questions. Each question should have one correct answer among four options. Format the output as JSON: [{"question": "Q", "choices": ["A", "B", "C", "D"], "correct_answer": "A"}, ...]. Only JSON output is required.`,
        },
        { role: "user", content: content },
      ],
    };

    const response = await fetchChatCompletion(requestData);
    const quizContent = response.choices[0].message.content;
    // Remove later
    console.log(quizContent)
    console.log(`☑️ Quiz has been generated successfully as '${videoId}`);



    let quizDataField:
      | "quizDataShort"
      | "quizDataMedium"
      | "quizDataLarge"
      | "quizDataExam"
      | "quizDataTest";

    if (numberQuestions === "5") {
      quizDataField = "quizDataShort";
    } else if (numberQuestions === "10") {
      quizDataField = "quizDataMedium";
    } else if (numberQuestions === "20") {
      quizDataField = "quizDataLarge";
    } else if (numberQuestions === "30") {
      quizDataField = "quizDataExam";
    } else if (numberQuestions === "1") {
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
          quizContent: quizContent,
          quizLength: quizDataField,
          quizId: quizId,
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
          quizContent: quizContent,
          quizId: quizId,
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
