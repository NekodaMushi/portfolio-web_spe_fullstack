import { drizzle } from "drizzle-orm/neon-http";
import { eq } from 'drizzle-orm';
import { neon } from "@neondatabase/serverless";
import { randomUUID } from "crypto";
import * as schema from "@/db/schema";


import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {
  schema,
});

const main = async () => {
  const { transcripts , users, quizzes, quizzesCompleted } = schema;
  
  try {
    console.log("Seeding database");

    await db.delete(quizzesCompleted)
    await db.delete(quizzes)
    await db.delete(transcripts);
    // await db.delete(users);

  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
