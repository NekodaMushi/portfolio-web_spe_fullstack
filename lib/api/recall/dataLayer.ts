
import { db } from "@/db/index";
import { quizzesCompleted, spacedRepetition } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

export const getLatestQuizCompleted = async (userId: string, quizId: string) => {
  return await db
    .select()
    .from(quizzesCompleted)
    .where(
      and(
        eq(quizzesCompleted.userId, userId),
        eq(quizzesCompleted.quizId, quizId)
      )
    )
    .orderBy(desc(quizzesCompleted.createdAt))
    .limit(1);
};

export const updateQuizCompleted = async (id: string, data: any) => {
  return await db
    .update(quizzesCompleted)
    .set(data)
    .where(eq(quizzesCompleted.id, id));
};

export const insertQuizCompleted = async (data: any) => {
  return await db.insert(quizzesCompleted).values(data);
};

export const getSpacedRepetition = async (userId: string, quizCompletedId: string) => {
  return await db
    .select()
    .from(spacedRepetition)
    .where(
      and(
        eq(spacedRepetition.userId, userId),
        eq(spacedRepetition.quizCompletedId, quizCompletedId)
      )
    )
    .limit(1);
};

export const updateSpacedRepetition = async (id: string, data: any) => {
  return await db
    .update(spacedRepetition)
    .set(data)
    .where(eq(spacedRepetition.id, id));
};

export const insertSpacedRepetition = async (data: any) => {
  return await db.insert(spacedRepetition).values(data);
};

export const deleteSpacedRepetition = async (userId: string, quizCompletedId: string) => {
  return await db
    .delete(spacedRepetition)
    .where(
      and(
        eq(spacedRepetition.userId, userId),
        eq(spacedRepetition.quizCompletedId, quizCompletedId)
      )
    );
};
