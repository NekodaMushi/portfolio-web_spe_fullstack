import { db } from "@/db/index";
import { quizzesCompleted, spacedRepetition } from "@/db/schema";
import { eq, desc, and, or, lt, lte } from "drizzle-orm";
import { auth } from "auth";
import { error } from "console";

export const dynamic = "force-dynamic";

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


     const currentDate = new Date();
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);


    // Learning Phase Quiz
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const LearningAndTransitionPhaseQuizzes = await db
      .select({
        successRate: quizzesCompleted.successRate,
        attemptNumber: quizzesCompleted.attemptNumber,
        totalQuestions: quizzesCompleted.totalQuestions,
        incorrectAnswers: quizzesCompleted.incorrectAnswers,
        highestScore: quizzesCompleted.highestScore,
        highestScoreTotal: quizzesCompleted.highestScoreTotal,
        updatedAt: quizzesCompleted.updatedAt,
        videoId: quizzesCompleted.videoId,
      })
      .from(quizzesCompleted)
      .where(
        and(
          eq(quizzesCompleted.userId, sessionUser.id),
          or(
            eq(quizzesCompleted.reviewState, false),
            and(
              eq(quizzesCompleted.reviewState, true),
              eq(quizzesCompleted.transitionToReview, true)
            )
          ),
          lt(quizzesCompleted.updatedAt, today) 
        )
      )
      .orderBy(desc(quizzesCompleted.createdAt));

    // Gets all Learning phase quiz which haven't been done today
    // console.log('Nb of LearningPhaseQuizzes',LearningAndTransitionPhaseQuizzes.length);


// Review Phase Quiz
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
tomorrow.setHours(23, 59, 59, 999); 

const reviewPhaseQuizzes = await db
  .select({
    successRate: quizzesCompleted.successRate,
    attemptNumber: quizzesCompleted.attemptNumber,
    totalQuestions: quizzesCompleted.totalQuestions,
    incorrectAnswers: quizzesCompleted.incorrectAnswers,
    highestScore: quizzesCompleted.highestScore,
    highestScoreTotal: quizzesCompleted.highestScoreTotal,
    updatedAt: quizzesCompleted.updatedAt,
    videoId: quizzesCompleted.videoId,
  })
  .from(quizzesCompleted)
  .innerJoin(spacedRepetition, eq(quizzesCompleted.id, spacedRepetition.quizCompletedId))
  .where(
    and(
      eq(quizzesCompleted.userId, sessionUser.id),
      eq(quizzesCompleted.reviewState, true),
      eq(quizzesCompleted.transitionToReview, false),
      lte(spacedRepetition.dueDate, tomorrow) // Get the quiz due today or before
    )
  )
  .orderBy(desc(quizzesCompleted.updatedAt));







// console.log(' Nb of reviewPhaseQuizzes with interval 1 =>', reviewPhaseQuizzes.length);

    return new Response(JSON.stringify({
      learningAndTransitionPhaseQuizzes: LearningAndTransitionPhaseQuizzes,
      reviewPhaseQuizzes: reviewPhaseQuizzes
    }), {
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
