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
    const { totalQuestions, incorrectAnswers, quizId, videoId } = await request.json();


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

    if (latestQuizCompleted.length > 0) {
      attemptNumberUpdated = latestQuizCompleted[0].attemptNumber + 1;
      await db.update(quizzesCompleted).set({
      // userId: sessionUser.id,
      // quizId: quizId,
      attemptNumber: attemptNumberUpdated,
      totalQuestions: totalQuestions,
      incorrectAnswers: incorrectAnswers,
    });
      
    } else {
      attemptNumberUpdated = 1;
      await db.insert(quizzesCompleted).values({
      userId: sessionUser.id,
      quizId: quizId,
      videoId: videoId,
      attemptNumber: attemptNumberUpdated,
      totalQuestions: totalQuestions,
      incorrectAnswers: incorrectAnswers,
    });
    }

    

    return new Response(JSON.stringify({ message: "Quiz result stored successfully" }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
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
