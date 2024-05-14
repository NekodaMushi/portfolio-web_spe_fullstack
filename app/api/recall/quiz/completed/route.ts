import { db } from "@/db/index";
import { quizzesCompleted, spacedRepetition } from "@/db/schema";
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
    let graduatedByPerformance;

    let under60ThreeTimeUpdated;

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

      let under60ThreeTimeUpdated =
        latestQuizCompleted.length > 0
          ? latestQuizCompleted[0].under60ThreeTime
          : 0;

      above60FourTimeUpdated = lastScore >= 60 ? above60FourTimeUpdated + 1 : 0;
      above70ThreeTimeUpdated =
        lastScore >= 70 ? above70ThreeTimeUpdated + 1 : 0;

      under60ThreeTimeUpdated =
        lastScore <= 60 ? under60ThreeTimeUpdated + 1 : 0;
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
      } else {
        // GAIN REVIEW STATE
        if (!isInReviewState) {
           // ---- REPETITION CASES ----
          // Case 1 => Whatever scoreRate: 4 last trial > 60%
          if (above60FourTimeUpdated >= 4) {
            isGraduated = true;
            isInTransition = true;
          }
          // Case 2 => Whatever scoreRate: 3 last trial > 70%
          if (above70ThreeTimeUpdated >= 3) {
            isGraduated = true;
            isInTransition = true;
          }

          // ---- BASE CASE ----
          // Case 3 => successRate above 80 & at least 2 quizz
          if (
            latestQuizCompleted[0].attemptNumber >= 2 &&
            newSuccessRate > 80
          ) {
            graduatedByPerformance = true;
          }
          // ---- PERFORMANCE CASE ----
          // Case 4 => mark a good score at Exam
          if (totalQuestions > 28 && currentSuccessRate >= 83) {
            graduatedByPerformance = true;
          }
        }
        // LOOSE REVIEW STATE
        else {
          if (newSuccessRate <= 60) {
            isGraduated = false;
            graduatedByPerformance = false;
            console.log("Loose graduation", isGraduated);
          }
        }
      }

      // Reset successRate
      if (isGraduated && !transitionReviewPeriod) {
        if (newSuccessRate < 70 && currentSuccessRate > 60) {
          newSuccessRate = currentSuccessRate;
          console.log("New success rate should be there:", newSuccessRate);
        }
        if (under60ThreeTimeUpdated) {
          newSuccessRate = currentSuccessRate;
        }
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
          above60FourTime: above60FourTimeUpdated,
          above70ThreeTime: above70ThreeTimeUpdated,
          under60ThreeTime: under60ThreeTimeUpdated,
          lastScore: lastScore,
          reviewState: isGraduated || graduatedByPerformance,
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

      // TEMP DEBUG ------------------

      // --------- REVIEW PHASE ---------
      // Check if quiz transitioning to review phase for 1thtime

      //  Need to add condition to erase SpacedRepetition table is user loose review state
      if (
        !latestQuizCompleted[0].reviewState &&
        latestQuizCompleted[0].attemptNumber > 5
      ) {
        const existingSpacedRepetitionToErase = await db
          .select()
          .from(spacedRepetition)
          .where(
            and(
              eq(spacedRepetition.userId, sessionUser.id),
              eq(spacedRepetition.quizCompletedId, latestQuizCompleted[0].id),
            ),
          );

        if (existingSpacedRepetitionToErase.length > 0) {
          await db
            .delete(spacedRepetition)
            .where(
              and(
                eq(spacedRepetition.userId, sessionUser.id),
                eq(spacedRepetition.quizCompletedId, latestQuizCompleted[0].id),
              ),
            );
          console.log(
            "Spaced Repetition entries deleted due to loss of review state.",
          );
        }
      }

      console.log("isInReviewState before review phase", isInReviewState);
      if (isInReviewState) {
        const existingSpacedRepetition = await db
          .select()
          .from(spacedRepetition)
          .where(
            and(
              eq(spacedRepetition.userId, sessionUser.id),
              eq(spacedRepetition.quizCompletedId, latestQuizCompleted[0].id),
            ),
          )
          .limit(1);

        if (existingSpacedRepetition.length > 0) {
          // Calculate new ease factor from user's perf
          const currentEaseFactor = existingSpacedRepetition[0].easeFactor;
          //-------

          const targetSuccessRate = 8;
          const dampeningFactor = 0.025; // The speed range
          const adjustmentFactor = 0.05; // How quickly it reacts

          // ----- TEMP FIX START   -----
          let newEaseFactor; //Whatever
          if (currentEaseFactor > 4800) {
            newEaseFactor = 2500;
            if (currentSuccessRate < 80) {
              newEaseFactor = 3400;
            } else if (currentSuccessRate < 60) {
              newEaseFactor = 2400;
            } else if (currentSuccessRate < 40) {
              newEaseFactor = 1400;
            }
          } else {
            // ----- TO FIX LATER   -----

            // console.log(
            //   Math.round(
            //     currentEaseFactor +
            //       dampeningFactor *
            //         (currentEaseFactor *
            //           (Math.log(targetSuccessRate / 100) /
            //             Math.log(currentSuccessRate / 100) - 1) +adjustmentFactor),),);


            newEaseFactor = Math.max(1300,Math.min(5000,Math.round(currentEaseFactor + dampeningFactor *(currentEaseFactor * (Math.log(targetSuccessRate / 100) /Math.log(currentSuccessRate / 100) - 1) + adjustmentFactor))));
          }



          let newInterval;
          if (newEaseFactor < 1500) {
            newInterval = 1;
          } else if (newEaseFactor < 2500) {
            newInterval = 3;
          } else if (newEaseFactor < 3500) {
            newInterval = 5;
          } else if (newEaseFactor < 4000) {
            newInterval = 8;
          } else if (newEaseFactor < 4400) {
            newInterval = 21;
          } else if (newEaseFactor < 4700) {
            newInterval = 51;
          } else if (newEaseFactor < 4950) {
            newInterval = 127;
          } else if (newEaseFactor < 5000) {
            newInterval = 317;
          } else {
            newInterval = 500; // Default case if bug
          }

          // ----- TEMP FIX END   -----
          // const currentInterval = existingSpacedRepetition[0].interval;
          // const newInterval = Math.max(1, Math.round(currentInterval * (newEaseFactor / currentEaseFactor)));

          // -- Next quiz depend of the calculated interval --
          await db
            .update(spacedRepetition)
            .set({
              interval: newInterval,
              easeFactor: newEaseFactor,
              dueDate: new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000), // Set the due date based on the new interval
            })
            .where(
              and(
                eq(spacedRepetition.userId, sessionUser.id),
                eq(spacedRepetition.quizCompletedId, latestQuizCompleted[0].id),
              ),
            );
        } else {
          // --- Next quiz in 3 days for new in review state ---
          await db.insert(spacedRepetition).values({
            userId: sessionUser.id,
            quizCompletedId: latestQuizCompleted[0].id,
            interval: 3,
            easeFactor: 2500,
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          });
        }
      }

      // --------------------------------
    } else {
      // Quiz completed first time
      attemptNumberUpdated = 1;
      newSuccessRate = currentSuccessRate;
      highestScore = totalQuestions - incorrectAnswers;
      highestScoreTotal = totalQuestions;

      above60FourTimeUpdated = currentSuccessRate >= 60 ? 1 : 0;
      above70ThreeTimeUpdated = currentSuccessRate >= 70 ? 1 : 0;

      // Case 4 => mark a excellent score at Exam
      if (totalQuestions > 28 && currentSuccessRate >= 83) {
        graduatedByPerformance = true;
      }

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
        reviewState: graduatedByPerformance,
        transitionToReview: graduatedByPerformance,
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
