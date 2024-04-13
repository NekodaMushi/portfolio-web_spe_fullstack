import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const transcriptString = message.join(" ");

  console.log("Received message:", message);

  try {
    const jsonData = {
      transcript: transcriptString,
    };

    await fs.promises.writeFile(
      "transcripts.json",
      JSON.stringify(jsonData, null, 2),
    );
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
