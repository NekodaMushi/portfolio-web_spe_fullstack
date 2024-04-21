import { fetchChatCompletion } from '@/lib/perplexityAPI';
import transcript from '@/transcripts.json'

export async function POST(request: Request) {
  const { transcriptString, videoTitle } = transcript;
  const requestData = {
    model: 'mistral-7b-instruct',
    messages: [
      { role: 'system', content: 'Generate a multiple choice quiz based on the provided transcript, with at least 5 questions. Ensure there is only one correct answer out of the four options. The quiz should be in json format with 4 choices for each question, with the correct answer marked as correct_answer property' },
      { role: 'user', content: transcriptString },
    ],
  };

   try {
     const response = await fetchChatCompletion(requestData);
     const quizContent = response.choices[0].message.content;
     const quiz = new Response(quizContent, {status: 200});
    return quiz;
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch chat completion' }), { status: 500 });
  }
}



