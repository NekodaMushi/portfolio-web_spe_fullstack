import { db } from "@/db/index"

async function main() {
  const trans = await db.query.transcripts.findFirst()

  console.log(trans);
}

main()
