import { NextRequest, NextResponse } from "next/server";
import { db, eq, and } from "@/db/index";
import { transcripts, users } from "@/db/schema";
import { auth } from "@/lib/auth/auth";

export async function POST(req: NextRequest) {
  const { spanData, videoTitle } = await req.json();
  const transcriptString = spanData.join(" ");

  try {
    const session = await auth();
    const sessionUser = session?.user;

    console.log(sessionUser);

    if (!sessionUser) {
      console.error("User is not authenticated");
      return new NextResponse(
        JSON.stringify({ error: "User is not authenticated" }),
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    }

    const existingTranscript = await db.select({
      videoId: transcripts.videoId,
    }).from(transcripts).where(and(
      eq(transcripts.videoId, videoTitle),
      eq(transcripts.userId, sessionUser.id),
      eq(transcripts.latest, 1)
    )).execute();

    if (existingTranscript.length > 0) {
      console.error("❎ User already has this transcript in the DB");
      return new NextResponse(
        JSON.stringify({ error: "Transcript already exists" }),
        {
          status: 409,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json", 
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    }

    // Set prev to 0
    await db.update(transcripts)
      .set({ latest: 0 })
      .where(and(
        eq(transcripts.userId, sessionUser.id),
        eq(transcripts.latest, 1)
      ))
      .execute();

    // Set new to 1  
    if (transcriptString) {
      await db.insert(transcripts).values({
        videoId: videoTitle,
        content: transcriptString,
        userId: sessionUser.id,
        latest: 1,
      }).execute();

      console.log("✅ Transcript stored in database successfully");
      return new NextResponse(
        JSON.stringify({ response: "Data stored successfully" }),
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    } else {
      console.log("❌ This isn't a transcript");
      return new NextResponse(
        JSON.stringify({ response: "Data not Stored" }),
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",  
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to store data" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
  }
}

export async function GET(req: NextRequest) {
  return new NextResponse(
    JSON.stringify({ error: "Method not allowed" }),
    {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    }
  );
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
