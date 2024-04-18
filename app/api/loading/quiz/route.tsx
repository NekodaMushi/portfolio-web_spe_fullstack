import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { transcripts } from "@/db/schema";
import fs from "fs";

export async function POST(req: NextRequest) {
  const { spanData, videoTitle } = await req.json();
  const transcriptString = spanData.join(" ");

  // console.log("Received spanData:", spanData);
  // console.log("Received videoTitle:", videoTitle);
  try {
    const jsonData = {
      transcriptString,
      videoTitle,
    };

    await fs.promises.writeFile(
      "transcripts.json",
      JSON.stringify(jsonData, null, 2),
    );
    await db.insert(transcripts).values({
      videoId: videoTitle,
      content: transcriptString,
    });
    console.log("Transcript stored in database successfully");
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
