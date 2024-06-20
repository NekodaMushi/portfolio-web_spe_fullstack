
import { getLatestQuizCompleted, updateQuizCompleted, insertQuizCompleted, getSpacedRepetition, updateSpacedRepetition, insertSpacedRepetition, deleteSpacedRepetition } from "./dataLayer";
import { calculateNewInterval } from "./newInterval";

export const processQuizResult = async (sessionUser: any, quizResult: any) => {
  const { totalQuestions, incorrectAnswers, quizId, videoId } = quizResult;
  const currentSuccessRate = (1 - incorrectAnswers / totalQuestions) * 100;
  
  const latestQuizCompleted = await getLatestQuizCompleted(sessionUser.id, quizId);

  let newSuccessRate: number;
  let highestScore: number;
  let highestScoreTotal: number;
  let attemptNumberUpdated: number;
  let above60FourTimeUpdated: number;
  let above70ThreeTimeUpdated: number;
  let under60ThreeTimeUpdated: number;
  let graduatedByPerformance;
  //Quiz Completed Before
  if (latestQuizCompleted.length > 0) {
    const previousQuiz = latestQuizCompleted[0];
    
    const previousSuccessRate = previousQuiz.successRate;
    const previousAttemptNumber = previousQuiz.attemptNumber;
    const previousHighestScore = previousQuiz.highestScore;
    const previousHighestScoreTotal = previousQuiz.highestScoreTotal;
    const lastScore = currentSuccessRate;
    const isInReviewState = previousQuiz.reviewState;

    // ---- REPETITION GRADUATION CASES ----
    above60FourTimeUpdated = lastScore >= 60 ? previousQuiz.above60FourTime + 1 : 0;
    above70ThreeTimeUpdated = lastScore >= 70 ? previousQuiz.above70ThreeTime + 1 : 0;
    under60ThreeTimeUpdated = lastScore <= 60 ? previousQuiz.under60ThreeTime + 1 : 0;

    attemptNumberUpdated = previousQuiz.attemptNumber + 1;
    // GLOBAL USER RATE
    newSuccessRate = (previousSuccessRate * previousAttemptNumber + currentSuccessRate) / attemptNumberUpdated;

    const currentScorePercentage = (totalQuestions - incorrectAnswers) / totalQuestions;
    const previousScorePercentage = previousHighestScore / previousHighestScoreTotal;

    if (currentScorePercentage > previousScorePercentage) {
      highestScore = totalQuestions - incorrectAnswers;
      highestScoreTotal = totalQuestions;
    } else {
      highestScore = previousHighestScore;
      highestScoreTotal = previousHighestScoreTotal;
    }

    // ============ REVIEW STATE ============
    let isGraduated;
    let isInTransition = previousQuiz.transitionToReview;
    console.log("isInTransition",isInTransition);
    if (isInTransition) {
      isInTransition = false;
    } else {
      // GAIN/ENTER TRANSITION STATE
      if (!isInReviewState) {
        // ---- REPETITION CASES ----
        // Case 1 => Whatever scoreRate: 4 last trial > 60% - REPETITION CASE
        // Case 2 => Whatever scoreRate: 3 last trial > 70% - REPETITION CASE
        // Case 3 => successRate above 80 & at least 2 quizz - REPEBASETITION CASE
        // Case 4 => mark a good score at Exam - PERFORMANCE CASE
        if (above60FourTimeUpdated >= 4 || above70ThreeTimeUpdated >= 3 || (previousQuiz.attemptNumber >= 2 && newSuccessRate > 80) || (totalQuestions > 28 && currentSuccessRate > 82)) {
          isGraduated = true;
          isInTransition = true;
          graduatedByPerformance = true;
        }
      } else {
        // LOOSE/EXIT REVIEW STATE
        if (newSuccessRate <= 60) {
          isGraduated = false;
          graduatedByPerformance = false;
        }
      }
    }
    // Reset successRate
    if ((isInReviewState || isGraduated) && !previousQuiz.transitionToReview) {
      if (newSuccessRate < 70 && currentSuccessRate > 60) {
        newSuccessRate = currentSuccessRate;
      }
      if (under60ThreeTimeUpdated >= 3) {
        newSuccessRate = currentSuccessRate;
      }
    }

    // Protection to avoid reviewState turning back to false
    const newReviewState = (isGraduated !== undefined ? isGraduated : isInReviewState) || (graduatedByPerformance !== undefined ? graduatedByPerformance : isInReviewState);
    await updateQuizCompleted(previousQuiz.id, {
      attemptNumber: attemptNumberUpdated,
      totalQuestions,
      incorrectAnswers,
      successRate: newSuccessRate,
      highestScore,
      highestScoreTotal,
      above60FourTime: above60FourTimeUpdated,
      above70ThreeTime: above70ThreeTimeUpdated,
      under60ThreeTime: under60ThreeTimeUpdated,
      lastScore: lastScore,
      reviewState: newReviewState,
      transitionToReview: isInTransition,
      updatedAt: new Date(),
    });

          // --------- REVIEW PHASE ---------


      //  Erase SpacedRepetition table is user loose review state
    if (!isInReviewState && previousQuiz.attemptNumber > 4) {
      await deleteSpacedRepetition(sessionUser.id, previousQuiz.id);
    }

    if (isInReviewState ) {
      const spacedRepetition = await getSpacedRepetition(sessionUser.id, previousQuiz.id);


      if (spacedRepetition.length > 0) {

        const { easeFactor, interval } = spacedRepetition[0];
        const spacedRepetitionMetrics = calculateNewInterval(
          easeFactor,
          70,
          currentSuccessRate,
          interval
        );
        const { newInterval, boundedEaseFactor } = spacedRepetitionMetrics;


     

        await updateSpacedRepetition(spacedRepetition[0].id, {
          interval: newInterval,
          easeFactor: boundedEaseFactor,
          dueDate: new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000), // Set due date based on interval
        });
      } else {
        // --- Next quiz in 3 days for new in review state ---
        await insertSpacedRepetition({
          userId: sessionUser.id,
          quizCompletedId: previousQuiz.id,
          interval: 3,
          easeFactor: 2500,
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        });
      }
    }
  } else {
    // --- Quiz completed first time ----
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


    await insertQuizCompleted({
      userId: sessionUser.id,
      quizId,
      videoId,
      attemptNumber: attemptNumberUpdated,
      totalQuestions,
      incorrectAnswers,
      successRate: newSuccessRate,
      highestScore,
      highestScoreTotal,
      above60FourTime: above60FourTimeUpdated,
      above70ThreeTime: above70ThreeTimeUpdated,
      lastScore: newSuccessRate,
      reviewState: graduatedByPerformance,
      transitionToReview: graduatedByPerformance,
    });
  }

  return { message: "Quiz result stored successfully" };
};
