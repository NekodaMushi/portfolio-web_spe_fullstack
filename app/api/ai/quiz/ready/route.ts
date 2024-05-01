import { db } from "@/db/index";
import { quizzes } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "auth";

export async function GET(request: Request) {
  try {
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

    const existingQuiz = await db
      .select({
        quizDataShort: quizzes.quizDataShort,
        quizDataMedium: quizzes.quizDataMedium,
        quizDataLarge: quizzes.quizDataLarge,
        quizDataExam: quizzes.quizDataExam,
        quizDataTest: quizzes.quizDataTest,
      })
      .from(quizzes)
      .where(eq(quizzes.userId, sessionUser.id))
      .limit(1);

    if (existingQuiz.length === 0) {
      return new Response(JSON.stringify({ quizReady: {} }), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    }

    const quizReady = {
      "2": existingQuiz[0].quizDataTest !== null,
      "5": existingQuiz[0].quizDataShort !== null,
      "10": existingQuiz[0].quizDataMedium !== null,
      "20": existingQuiz[0].quizDataLarge !== null,
      "30": existingQuiz[0].quizDataExam !== null,
    };

    return new Response(JSON.stringify({ quizReady }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error: any) {
    console.log("Error in GET route:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch quiz data" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

