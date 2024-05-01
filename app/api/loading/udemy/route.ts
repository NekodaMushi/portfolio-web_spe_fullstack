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

    if (!sessionUser) {
      console.error("User is not authenticated");
      return NextResponse.json({ error: "User is not authenticated" }, { status: 401 });
    }


    const existingTranscript = await db.select({
      videoId: transcripts.videoId,
    }).from(transcripts).where(and(
      eq(transcripts.videoId, videoTitle),
      eq(transcripts.userId, sessionUser.id),
      eq(transcripts.latest, 1)
      // Check if latest transcript
    )).execute();

    if (existingTranscript.length > 0) {
      console.error("❎ User already has this transcript in the DB");
      return NextResponse.json({ error: "Transcript already exists" }, { status: 409 });
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
      return NextResponse.json({ response: "Data stored successfully" });
    } else {
      console.log("❌ This isn't a transcript");
      return NextResponse.json({ response: "Data not Stored" });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to store data" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
