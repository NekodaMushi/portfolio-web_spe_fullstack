import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";
import { config } from "dotenv";
import { and, eq } from "drizzle-orm";

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


// async function UserTrialDataS() {
//   const quizId = "16be4e58-22a0-4774-8b16-a918a9319f5f";
//   const videoId = "317. Building the Cart Overview With Redux Selectors";


//   await simulateUserTrial(quizId, videoId, 2, 5);

//   // await simulateUserTrial(quizId, videoId, 15, 20);

//   // await simulateUserTrial(quizId, videoId, 4, 5);

//   // await simulateUserTrial(quizId, videoId, 14, 30);

//   // await simulateUserTrial(quizId, videoId, 14, 30);
// }

// async function UserTrialDataT() {
//   const quizId = "fff00aa0-0b16-41ad-9c57-bbca5a257e57";
//   const videoId = "319. Deleting Cart Items";


//   await simulateUserTrial(quizId, videoId, 0, 1);

//   // await simulateUserTrial(quizId, videoId, 15, 20);

//   // await simulateUserTrial(quizId, videoId, 4, 5);

//   // await simulateUserTrial(quizId, videoId, 14, 30);

//   // await simulateUserTrial(quizId, videoId, 14, 30);
// }



async function UserTrialDataM() {
  const quizId = "a79cf187-6396-4ff9-8e06-3622d100c7c6";
  const videoId = "197. Graph + Tree Traversals";

  // Check normal process OK
  // Check reducing drastically when he passes into transite OK
  // except for last case if he gets through perf
  //  await simulateUserTrial(quizId, videoId, 6, 10);

  // await simulateUserTrial(quizId, videoId, 7, 10);

  // await simulateUserTrial(quizId, videoId, 0, 10);

  // await simulateUserTrial(quizId, videoId, 0, 10);


  // await simulateUserTrial(quizId, videoId, 8, 10);

  //   await simulateUserTrial(quizId, videoId, 9, 10);

  // await simulateUserTrial(quizId, videoId, 9, 10);


  

  await simulateUserTrial(quizId, videoId, 1, 10);

    await simulateUserTrial(quizId, videoId, 1, 10);

  // await simulateUserTrial(quizId, videoId, 1, 10);


  // await simulateUserTrial(quizId, videoId, 7, 10);

 
  


}

const updateSpacedRepetitionInterval = async (spacedRepetitionId: string) => {
  try {
    await db.update(schema.spacedRepetition)
      .set({
        interval: 1,
        updatedAt: new Date()
      })
      .where(eq(schema.spacedRepetition.id, spacedRepetitionId))
      .execute();

    console.log(`Interval updated successfully for ID: ${spacedRepetitionId}`);
  } catch (error) {
    console.error(`Error updating interval for ID: ${spacedRepetitionId}`, error);
    throw error;
  };

}



const main = async () => {
  const { transcripts, users, quizzes, quizzesCompleted } = schema;

  try {
    console.log("Seeding database");

    // await db.delete(schema.spacedRepetition);
    // await db.delete(quizzesCompleted);
    // await db.delete(quizzes);
    // await db.delete(transcripts);
    // await db.delete(users);

    // Simulate user trials
    // simulateGenQuiz("60. Creating a State Variable With useState", 'T')
    // UserTrialDataM();
    // UserTrialDataS();
    // UserTrialDataT();
    const spacedRepetitionId = "42664dca-05f3-44ed-aa5a-24e63ccd77f7"; 
updateSpacedRepetitionInterval(spacedRepetitionId);



    
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
