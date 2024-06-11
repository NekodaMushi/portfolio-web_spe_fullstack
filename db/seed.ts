import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {
  schema,
});

const simulateUserTrial = async (quizId: string, videoId: string, score: number, totalQuestions: number) => {
  try {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/recall/quiz/completed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 06b51c75-bf24-4aaa-a00d-2294018dbcbf",
      },
      body: JSON.stringify({
        totalQuestions: totalQuestions,
        attemptNumber: 1,
        incorrectAnswers: totalQuestions - score,
        quizId: quizId,
        videoId: videoId,
        
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Quiz data saved successfully:", data);
    } else {
      console.error("Failed to save quiz data");
    }
  } catch (error) {
    console.error("Error saving quiz data:", error);
  }
};





async function UserTrialDataM() {
  const quizId = "44bf5745-b629-4816-a21d-eb52b39bbd42";
  const videoId = "71. Implementing An Array";

    await simulateUserTrial(quizId, videoId, 2, 10);

    await simulateUserTrial(quizId, videoId, 7, 10);

    await simulateUserTrial(quizId, videoId, 0, 10);

    await simulateUserTrial(quizId, videoId, 0, 10);

    await simulateUserTrial(quizId, videoId, 8, 10);

}
  





// const updateDueDateToOneDayAgo = async (spacedRepetitionId: string) => {
//   try {
//     const oneDayAgo = new Date(Date.now());

//     const updatedRecord = await db.update(schema.spacedRepetition)
//       .set({
//         dueDate: oneDayAgo,
//         updatedAt: oneDayAgo,
//       })
//       .where(eq(schema.spacedRepetition.id, spacedRepetitionId))
//       .returning({ dueDate: schema.spacedRepetition.dueDate, updatedAt: schema.spacedRepetition.updatedAt })
//       .then((result) => result[0]);

//     console.log(`Due date updated successfully for ID: ${spacedRepetitionId}`);
//     console.log('Updated date:', updatedRecord.updatedAt);

//     return updatedRecord.dueDate;
//   } catch (error) {
//     console.error(`Error updating due date for ID: ${spacedRepetitionId}`, error);
//     throw error;
//   }
// };



const main = async () => {
  const { transcripts, users, quizzes, quizzesCompleted } = schema;

  try {
    console.log("Seeding database");

    await db.delete(schema.spacedRepetition);
    await db.delete(quizzesCompleted);
    await db.delete(quizzes);
    await db.delete(transcripts);
    await db.delete(schema.sessions);

  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

// const main = async () => {
//   const { quizzes, spacedRepetition, quizzesCompleted } = schema;

//   try {
//     console.log("Starting to erase user data");

   


//     const deletedSpacedRepetition = await db.delete(spacedRepetition)
//       .where(eq(spacedRepetition.userId, "06b51c75-bf24-4aaa-a00d-2294018dbcbf"))
//       .returning({ deletedId: spacedRepetition.id });


//     const deletedQuizzesCompleted = await db.delete(quizzesCompleted)
//       .where(eq(quizzesCompleted.userId, "06b51c75-bf24-4aaa-a00d-2294018dbcbf"))
//       .returning({ deletedId: quizzesCompleted.id });
    

//     const deletedQuizzes = await db.delete(quizzes)
//       .where(eq(quizzes.userId, "06b51c75-bf24-4aaa-a00d-2294018dbcbf"))
//       .returning({ deletedId: quizzes.id });

//     console.log("User data erased successfully:");
//     console.log("Deleted Quizzes IDs:", deletedQuizzes.map(item => item.deletedId));
//     console.log("Deleted Spaced Repetition IDs:", deletedSpacedRepetition.map(item => item.deletedId));
//     console.log("Deleted Quizzes Completed IDs:", deletedQuizzesCompleted.map(item => item.deletedId));

//   } catch (error) {
//     console.error("Error erasing user data:", error);
//     throw new Error("Failed to erase user data");
//   }
// };



main();
