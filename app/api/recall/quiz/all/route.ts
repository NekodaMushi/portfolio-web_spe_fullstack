import { db } from "@/db/index";
import { quizzesCompleted } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
}

export async function GET(request: Request) {
  try {

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer '

      if (!process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET is not defined in the environment variables.");
  }
    const decoded = jwt.verify(token, process.env.AUTH_SECRET) as TokenPayload;
    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {

      const userId = decoded.id;
      console.log("-------------------")
      console.log(userId)

      const quizCompletedData = await db
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
        .where(eq(quizzesCompleted.userId, userId))
        .orderBy(desc(quizzesCompleted.createdAt))
        .limit(3);

      return new Response(JSON.stringify(quizCompletedData), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    } else {
      throw new Error("Invalid token payload");
    }
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
