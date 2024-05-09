import { db } from "@/db/index";
import { quizzesCompleted } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    // Retrieve UserId from request headers
    const token = request.headers.get('Authorization');
    if (!token) {
      throw new Error("Token is missing in the headers");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
   if (!decoded) {
      throw new Error("UserId is missing in the headers");
   }
    
    console.log(decoded)
    const userId = decoded;
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
