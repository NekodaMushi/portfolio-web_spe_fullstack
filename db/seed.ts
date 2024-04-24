import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { randomUUID } from "crypto";
import * as schema from "./schemas/schema";
import * as usersTable from "./schemas/users";

import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {
  schema,
});

const main = async () => {
  const { transcripts } = schema;
  const { users } = usersTable;
  try {
    console.log("Seeding database");

    // Delete all data
    // await db.delete(transcripts);
    // await db.delete(users);


    await db.insert(users).values([
      {
        id: randomUUID(),
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
      {
        id: randomUUID(),
        name: "Bob Smith",
        email: "bob.smith@example.com",
      },
    ]);
    

    // const aliceUserId = (await db.select().from(users).where(eq(users.email,"alice.johnson@example.com")).limit(1))[0].id;
    // const bobUserId = (await db.select().from(users).where(eq(users.email, "bob.smith@example.com")).limit(1))[0].id;

    // await db.insert(transcripts).values([
    //   {
    //     id: 1,
    //     userId: aliceUserId,
    //     videoId: "71. A Basic Intro to Flexbox: Adding More Flex Items",
    //     content: "Example of transcript 1: Actually, I'm not sure about this one here. Let's reload it. Or first, save this actually and then reload it. Alright it still does that. Okay, that looks a bit weird here.",
    //   },
    //   {
    //     id: 2,
    //     userId: bobUserId,
    //     videoId: "77. Building the Header - Part 3",
    //     content: "Example of transcript 2: So let's very quickly implement that. So where we want the space to happen is basically on the users-nav-icon-box and this one and the users, so these two classes. Now we could go ahead and group them, so make a selector for icon box and users at the same time, but I'm simply gonna do it like this. So the users nav and then all of the direct children. And that will have the exact same effect",
    //   },
    //   {
    //     id: 3,
    //     userId: aliceUserId,
    //     videoId: "Fake Transcript",
    //     content: "So let's increase it. While not that much probably... So let's actually... Like, I dunno, maybe 1000 pixels and so let's see what it looks like, like this. So with all the space, this creates a bunch of different lines here. Actually, I'm not sure about this one here. Let's reload it. Or first, save this actually and then reload it. Alright it still does that. Okay, that looks a bit weird here.",
    //   },
    // ]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
