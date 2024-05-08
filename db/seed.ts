import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";
// import { simulateGenQuiz } from "./testing/simulateGenQuiz";
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
  const quizId = "16be4e58-22a0-4774-8b16-a918a9319f5f";
  const videoId = "60. Creating a State Variable With useState";


  await simulateUserTrial(quizId, videoId, 7, 10);

  await simulateUserTrial(quizId, videoId, 15, 20);

  await simulateUserTrial(quizId, videoId, 4, 5);

  await simulateUserTrial(quizId, videoId, 14, 30);

  await simulateUserTrial(quizId, videoId, 14, 30);
}

async function UserTrialDataS() {
  const quizId = "16be4e58-22a0-4774-8b16-a918a9319f5f";
  const videoId = "317. Building the Cart Overview With Redux Selectors";


  await simulateUserTrial(quizId, videoId, 2, 5);

  // await simulateUserTrial(quizId, videoId, 15, 20);

  // await simulateUserTrial(quizId, videoId, 4, 5);

  // await simulateUserTrial(quizId, videoId, 14, 30);

  // await simulateUserTrial(quizId, videoId, 14, 30);
}

async function UserTrialDataT() {
  const quizId = "fff00aa0-0b16-41ad-9c57-bbca5a257e57";
  const videoId = "319. Deleting Cart Items";


  await simulateUserTrial(quizId, videoId, 0, 1);

  // await simulateUserTrial(quizId, videoId, 15, 20);

  // await simulateUserTrial(quizId, videoId, 4, 5);

  // await simulateUserTrial(quizId, videoId, 14, 30);

  // await simulateUserTrial(quizId, videoId, 14, 30);
}

const main = async () => {
  const { transcripts, users, quizzes, quizzesCompleted } = schema;

  try {
    console.log("Seeding database");

    await db.delete(quizzesCompleted);
    await db.delete(quizzes);
    await db.delete(transcripts);
    // await db.delete(users);

    // Simulate user trials
    // simulateGenQuiz("60. Creating a State Variable With useState", 'T')
    // UserTrialDataM();
    // UserTrialDataS();
    // UserTrialDataT();

    
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
