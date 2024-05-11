import { db } from "@/db/index";
import { quizzesCompleted } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { auth } from "auth";
import { error } from "console";

export async function POST(request: Request) {
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

    const { totalQuestions, incorrectAnswers, quizId, videoId } =
      await request.json();
    const currentSuccessRate = (1 - incorrectAnswers / totalQuestions) * 100;

    const latestQuizCompleted = await db
      .select()
      .from(quizzesCompleted)
      .where(
        and(
          eq(quizzesCompleted.userId, sessionUser.id),
          eq(quizzesCompleted.quizId, quizId),
        ),
      )
      .orderBy(desc(quizzesCompleted.createdAt))
      .limit(1);

    let attemptNumberUpdated;
    let newSuccessRate;
    let highestScore;
    let highestScoreTotal;

    if (latestQuizCompleted.length > 0) {
      // Quiz completed before
      const previousSuccessRate = latestQuizCompleted[0].successRate;
      const previousAttemptNumber = latestQuizCompleted[0].attemptNumber;
      const previousHighestScore = latestQuizCompleted[0].highestScore;
      const previousHighestScoreTotal =
        latestQuizCompleted[0].highestScoreTotal;

      attemptNumberUpdated = latestQuizCompleted[0].attemptNumber + 1;
      newSuccessRate =
        (previousSuccessRate * previousAttemptNumber + currentSuccessRate) /
        attemptNumberUpdated;

      const currentScorePercentage =
        (totalQuestions - incorrectAnswers) / totalQuestions;
      const previousScorePercentage =
        previousHighestScore / previousHighestScoreTotal;

      if (currentScorePercentage > previousScorePercentage) {
        highestScore = totalQuestions - incorrectAnswers;
        highestScoreTotal = totalQuestions;
      } else {
        highestScore = previousHighestScore;
        highestScoreTotal = previousHighestScoreTotal;
      }

      await db
        .update(quizzesCompleted)
        .set({
          attemptNumber: attemptNumberUpdated,
          totalQuestions: totalQuestions,
          incorrectAnswers: incorrectAnswers,
          successRate: newSuccessRate,
          highestScore: highestScore,
          highestScoreTotal: highestScoreTotal,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(quizzesCompleted.userId, sessionUser.id),
            eq(quizzesCompleted.quizId, quizId),
            eq(quizzesCompleted.id, latestQuizCompleted[0].id),
          ),
        );
    } else {
      // Quiz completed first time
      attemptNumberUpdated = 1;
      newSuccessRate = currentSuccessRate;
      highestScore = totalQuestions - incorrectAnswers;
      highestScoreTotal = totalQuestions;

      await db.insert(quizzesCompleted).values({
        userId: sessionUser.id,
        quizId: quizId,
        videoId: videoId,
        attemptNumber: attemptNumberUpdated,
        totalQuestions: totalQuestions,
        incorrectAnswers: incorrectAnswers,
        successRate: newSuccessRate,
        highestScore: highestScore,
        highestScoreTotal: highestScoreTotal,
      });
    }

    return new Response(
      JSON.stringify({ message: "Quiz result stored successfully" }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  } catch (error: any) {
    console.log("Error in POST route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch quiz result" }),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }
}
