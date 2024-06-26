import { fetchChatCompletion } from "@/lib/openaiAPI"; 
import { db } from "@/db/index";
import { quizzes, transcripts } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "auth";
import { validateAndCorrectQuizContent } from "@/lib/validators/doubleAiChecking";
import { QuizGenerationSchema } from "@/lib/validators/generateQuiz";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const numQuestions = url.searchParams.get("numQuestions") || "5";
    const validationResult = QuizGenerationSchema.safeParse({ numQuestions });

    if (!validationResult.success) {
      return new Response(JSON.stringify({ error: "Invalid data" }), {
        status: 400,
        headers: {
          "content-type": "application/json",
        },
      });
    }

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
    // console.log(sessionUser);
    const lastTranscript = await db
      .select({
        videoId: transcripts.videoId,
        content: transcripts.content,
      })
      .from(transcripts)
      .where(
        and(eq(transcripts.userId, sessionUser.id), eq(transcripts.latest, 1))
      )
      .limit(1);

    if (lastTranscript.length === 0) {
      return new Response(
        JSON.stringify({ message: "No transcripts found for the user" }),
        {
          status: 404,
          headers: {
            "content-type": "application/json",
          },
        }
      );
    }

    // If Response -> Can't process anything after

    const { videoId, content } = lastTranscript[0];
    const transcriptString = content;
    const videoTitle = videoId;

    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Generate a multiple choice quiz from the provided transcript with exactly ${numQuestions} questions. Each question should have one correct answer, randomly assigned among four options (A, B, C, or D). Format the output as JSON: [{"question": "Q", "choices": {"A": "option A", "B": "option B", "C": "option C", "D": "option D"}, "correct_answer": "D"}, ...]. The correct answer format should be the key of the option. Ensure that the assignment of the correct answer is randomized for each question. Only JSON output is required. Please assure to always have one correct answer per question.`,
        },
        { role: "user", content: transcriptString },
      ],
    };

    const response = await fetchChatCompletion(requestData);
    let quizContent = response.choices[0].message.content;

    // Extra Layer of Security => Validate and Correct the quiz content
    quizContent = await validateAndCorrectQuizContent(quizContent, numQuestions);

    console.log(`☑️ Quiz has been generated successfully as '${videoTitle}`);

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
    } else if (numQuestions === "30") {
      quizDataField = "quizDataExam";
    } else if (numQuestions === "1") {
      quizDataField = "quizDataTest";
    } else {
      throw new Error("Wrong number of questions");
    }

    const existingQuiz = await db
      .select()
      .from(quizzes)
      .where(
        and(eq(quizzes.userId, sessionUser.id), eq(quizzes.videoId, videoTitle))
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
    } else {
      const result = await db.insert(quizzes).values({
        userId: sessionUser.id,
        videoId: videoTitle,
        [quizDataField]: quizContent,
      }).returning({ id: quizzes.id });
      quizId = result[0].id;
      console.log("✅ Quiz has been stored successfully");
    }

    const quizResponse = {
      quizData: quizContent,
      videoId: videoTitle,
      quizId,
    };

    return new Response(JSON.stringify(quizResponse), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error: any) {
    console.log("Error in POST route:", error);

    let errorMessage = "Failed to fetch chat completion";
    if (error.message.includes("Invalid model")) {
      errorMessage = `Invalid model. Please refer to the documentation for permitted models: https://beta.openai.com/docs/models/gpt-3.5`;
    }

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: error.code || 500, headers: { "content-type": "application/json" } },
    );
  }
}
