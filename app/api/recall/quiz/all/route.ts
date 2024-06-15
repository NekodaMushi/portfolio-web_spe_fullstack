import { db } from "@/db/index";
import { quizzesCompleted } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
}
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  try {
    const { token, page } = await request.json();
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }
    if (!process.env.AUTH_SECRET) {
      throw new Error("AUTH_SECRET is not defined in the environment variables.");
    }
    const decoded = jwt.verify(token, process.env.AUTH_SECRET) as TokenPayload;
    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      const userId = decoded.id;

      const limit = 4;
      const offset = (page - 1) * limit;
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
        .offset(offset)
        .limit(limit);

      return new Response(JSON.stringify(quizCompletedData), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    } else {
      throw new Error("Invalid token payload");
    }
  } catch (error: any) {
    console.log("Error in POST route:", error);
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
