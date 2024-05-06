import { db } from "@/db/index";
import { quizzesCompleted } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "auth";
import { error } from "console";

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

    const quizCompletedData = await db
      .select({
        successRate: quizzesCompleted.successRate,
        attemptNumber: quizzesCompleted.attemptNumber,
        totalQuestions: quizzesCompleted.totalQuestions,
        incorrectAnswers: quizzesCompleted.incorrectAnswers,
        updatedAt: quizzesCompleted.updatedAt,
        videoId: quizzesCompleted.videoId,
      })
      .from(quizzesCompleted)
      .where(eq(quizzesCompleted.userId, sessionUser.id))
      .orderBy(desc(quizzesCompleted.createdAt))
      .limit(3);

    return new Response(JSON.stringify(quizCompletedData), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error: any) {
    console.log("Error in GET route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch quiz completed" }),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }
}
