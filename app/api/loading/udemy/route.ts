import { NextRequest, NextResponse } from "next/server";
import { db, eq, and } from "@/db/index";
import { transcripts, users } from "@/db/schema";
import { auth } from "@/lib/auth/auth"
import fs from "fs";

export async function POST(req: NextRequest) {
  const { spanData, videoTitle } = await req.json();
  const transcriptString = spanData.join(" ");

  try {
    const jsonData = {
      transcriptString,
      videoTitle,
    };

    // await fs.promises.writeFile(
    //   "transcripts.json",
    //   JSON.stringify(jsonData, null, 2),
    // );

    const session = await auth();
    const sessionUser = session?.user;
    console.log(sessionUser);

    if (!sessionUser) {
      console.error("User is not authenticated");
      return NextResponse.json({ error: "User is not authenticated" }, { status: 401 });
    }


    
    const existingTranscripts = await db.select({
      videoId: transcripts.videoId,
    }).from(transcripts).innerJoin(users, eq(transcripts.userId, users.id)).where(and(
      eq(transcripts.videoId, jsonData.videoTitle),
      eq(users.id, sessionUser.id)
    )).execute();
    
    // Bad select bellow
    // const existingTranscripts = await db.select(transcripts).where({
    //   videoId: videoTitle
    // }).execute();
    if (existingTranscripts.length > 0) {
      console.error("❎ User already have this transcript in the DB");
      return NextResponse.json({ error: "Transcript already exists" }, { status: 409 });
    }

    // Insert the new transcript since it does not exist
    await db.insert(transcripts).values({
      videoId: videoTitle,
      content: transcriptString,
      userId: sessionUser.id,
    }).execute();

    console.log("✅ Transcript stored in database successfully");
    return NextResponse.json({ response: "Data stored successfully" });

  } catch (error) {
    console.error("Error writing to file:", error);
    return NextResponse.json(
      { error: "Failed to store data" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
