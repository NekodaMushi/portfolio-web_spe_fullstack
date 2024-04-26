import { db } from "@/db/index"
import { transcripts } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { auth } from "auth"

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: {
          'content-type': 'application/json'
        },
      });
    }

    const sessionUser = session?.user;

    const lastTranscript = await db
      .select({
        videoId: transcripts.videoId,
        content: transcripts.content
        
      })
      .from(transcripts)
      .where(eq(transcripts.userId, sessionUser.id))
      .orderBy(desc(transcripts.createdAt))
      .limit(1);

    if (lastTranscript.length === 0) {
      return new Response(JSON.stringify({ message: 'No transcripts found for the user' }), {
        status: 404,
        headers: {
          'content-type': 'application/json'
        },
      });
    }

    return new Response(JSON.stringify(lastTranscript[0]), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      },
    });
  } catch (error) {
    console.log('Error fetching last transcript', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'content-type': 'application/json'
      },
    });
  }
}
