import { db } from "@/db/index";
import { quizzes } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { auth } from "auth";
import jwt from 'jsonwebtoken';

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
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
    const url = new URL(request.url);
    const videoId = url.searchParams.get("videoId"); 
    


    if (!videoId) {
      return new Response(JSON.stringify({ error: "Missing videoId parameter" }), {
        status: 400,
        headers: {
          "content-type": "application/json",
        },
      });
    }

    const quizData = await db
      .select({
        quizDataShort: quizzes.quizDataShort,
        quizDataMedium: quizzes.quizDataMedium,
        quizDataLarge: quizzes.quizDataLarge,
        quizDataExam: quizzes.quizDataExam,
        quizDataTest: quizzes.quizDataTest,
        quizId: quizzes.id,
        videoId: quizzes.videoId,
        createdAt: quizzes.createdAt,
        updatedAt: quizzes.updatedAt
      })
      .from(quizzes)
      .where(and(
        eq(quizzes.userId, sessionUser.id),
        eq(quizzes.videoId, videoId)) 
      )
      .orderBy(desc(quizzes.updatedAt))
      .limit(1);

    if (quizData.length === 0) {
      return new Response(JSON.stringify({ error: "No quiz data found for the provided videoId" }), {
        status: 404,
        headers: {
          "content-type": "application/json",
        },
      });
    }


    return new Response(JSON.stringify(quizData[0]), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error: any) {
    console.log("Error in GET route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch quiz data" }),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }
}
