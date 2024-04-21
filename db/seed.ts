
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {
	schema,
});


const main = async () => {
  const { users, transcripts} = schema
  try {
    console.log("Seeding database");

    // Delete all data
    await db.delete(users);
    await db.delete(transcripts);

    await db.insert(users).values([
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob.smith@example.com",
      },
    ]);

    await db.insert(transcripts).values([
      {
        id: 1,
        userId: 1,
        videoId: "71. A Basic Intro to Flexbox: Adding More Flex Items",
        content: "Example of transcript 1 : Actually, I'm not sure about this one here. Let's reload it. Or first, save this actually and then reload it. Alright it still does that. Okay, that looks a bit weird here. ",
      },
      {
        id: 2,
        userId: 2,
        videoId: "77. Building the Header - Part 3",
        content: " Example of transcript 2 : So let's very quickly implement that. So where we want the space to happen is basically on the user-nav-icon-box and this one and the user, so these two classes. Now we could go ahead and group them, so make a selector for icon box and user at the same time, but I'm simply gonna do it like this. So the user nav and then all of the direct children. And that will have the exact same effect",
      },
      {
        id: 3,
        userId: 1,
        videoId: "Fake Transcript",
        content: " So let's increase it. While not that much probably... So let's actually... Like, I dunno, maybe 1000 pixels and so let's see what it looks like, like this. So with all the space, this creates a bunch of different lines here. Actually, I'm not sure about this one here. Let's reload it. Or first, save this actually and then reload it. Alright it still does that. Okay, that looks a bit weird here.",
      },
    ]);

  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
