import { fetchChatCompletion } from '@/lib/perplexityAPI';
import { db } from '@/db/index';
import { transcripts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from 'auth';

export async function POST(request: Request) {
  try {
    // -- Auth and get user from session --
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

    // -- Fetch last transcript from DB --
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

    const { videoId, content } = lastTranscript[0];
    const transcriptString = content;
    const videoTitle = videoId;
    // needs to use this later

        // ---- Sending to AI ----

    const requestData = {
      model: 'mistral-7b-instruct',
      messages: [
        { role: 'system', content: 'Generate a multiple choice quiz based on the provided transcript, with at least 5 questions. Ensure there is only one correct answer out of the four options. The quiz should be in json format with 4 choices for each question, with the correct answer marked as correct_answer property' },
        { role: 'user', content: transcriptString },
      ],
    };


    const response = await fetchChatCompletion(requestData);
    const quizContent = response.choices[0].message.content;
    const quiz = new Response(quizContent, {status: 200});
    return quiz;
  } catch (error) {
    console.log('Error in POST route:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch chat completion' }), { status: 500 });
  }

  // Store in the DB to retrieve it now & later on
}
