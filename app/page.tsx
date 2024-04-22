import Link from "next/link";
import { db } from "@/db/index";
import { transcripts } from "@/db/schema";

export default async function HomePage() {
  const transcript = await db.select().from(transcripts);
  return (
    <div>
      <h1>Home</h1>
      <div>{JSON.stringify(transcript)}</div>
    </div>
  );
}
