import { db } from "@/db/index";
import { quizzesCompleted } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { auth } from "auth";
import { error } from "console";

export async function POST(request: Request) {
  // DEV
  try {
    let sessionUser;
    const session = await auth();
    if (session) {
      sessionUser = session.user;
    } else {

      sessionUser = { id: "06b51c75-bf24-4aaa-a00d-2294018dbcbf" }; 
    }

    // PROD
    // try {
    // const session = await auth();
    // if (!session) {
    //   return new Response(JSON.stringify({ error: "Unauthorized" }), {
    //     status: 401,
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   });
    // }
    // const sessionUser = session?.user;




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

    // New
    let above60FourTimeUpdated;
    let above70ThreeTimeUpdated;
    // let lastScoreUpdated;

    if (latestQuizCompleted.length > 0) {
      // Quiz completed before
      const previousSuccessRate = latestQuizCompleted[0].successRate;
      const previousAttemptNumber = latestQuizCompleted[0].attemptNumber;
      const previousHighestScore = latestQuizCompleted[0].highestScore;
      const previousHighestScoreTotal =
        latestQuizCompleted[0].highestScoreTotal;

      // New
      const lastScore = currentSuccessRate;
      const isInReviewState = latestQuizCompleted[0].reviewState;

      // ---- REPETITION GRADUATION CASES ---- 
      let above60FourTimeUpdated =
        latestQuizCompleted.length > 0
          ? latestQuizCompleted[0].above60FourTime
          : 0;
      let above70ThreeTimeUpdated =
        latestQuizCompleted.length > 0
          ? latestQuizCompleted[0].above70ThreeTime
          : 0;

      above60FourTimeUpdated = lastScore >= 60 ? above60FourTimeUpdated + 1 : 0;
      above70ThreeTimeUpdated = lastScore >= 70 ? above70ThreeTimeUpdated + 1 : 0;


      // --

      attemptNumberUpdated = latestQuizCompleted[0].attemptNumber + 1;
      // GLOBAL USER RATE
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

      // ============ REVIEW STATE ============
      const transitionReviewPeriod = latestQuizCompleted[0].transitionToReview;


      let isGraduated;
      
      let isInTransition = transitionReviewPeriod;
      if (transitionReviewPeriod) {
        isInTransition = false;
      } else  {
        // GAIN REVIEW STATE
        if (!isInReviewState) {
          if (above60FourTimeUpdated >= 4) {
            isGraduated = true;
            isInTransition = true
          }
          if (above70ThreeTimeUpdated >= 3) {
            isGraduated = true;
            isInTransition = true
          }
        }
        // LOOSE REVIEW STATE
        else {
          if (newSuccessRate <= 60) {
            isGraduated = false;
            console.log("Loose graduation")
          }
        }
        

      }


      // Reset successRate
      if (isGraduated && !transitionReviewPeriod) {
        // Is it necessary to reset successRate if user already have good score

        // --------------------TO CHECK AGAIN
        if (newSuccessRate < 70) {
        newSuccessRate = currentSuccessRate
        console.log("New success rate should be there:", newSuccessRate)
        }

      }
      console.log(newSuccessRate)

      // ---- PERFORMANCE CASE ---- 
      // Case : successRate above 80 & at least 2 quizz

      await db
        .update(quizzesCompleted)
        .set({
          attemptNumber: attemptNumberUpdated,
          totalQuestions: totalQuestions,
          incorrectAnswers: incorrectAnswers,
          successRate: newSuccessRate,
          highestScore: highestScore,
          highestScoreTotal: highestScoreTotal,
          above60FourTime: above60FourTimeUpdated,
          above70ThreeTime: above70ThreeTimeUpdated,
          lastScore: lastScore,
          reviewState: isGraduated,
          transitionToReview: isInTransition,

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

      above60FourTimeUpdated = currentSuccessRate >= 60 ?  1 : 0;
      above70ThreeTimeUpdated = currentSuccessRate >= 70 ? 1 : 0;
      
      // Last case to implement if user does exam with highScore
      // transition and graduation to turn on


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
        above60FourTime: above60FourTimeUpdated,
        above70ThreeTime: above70ThreeTimeUpdated,
        lastScore: newSuccessRate,
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
