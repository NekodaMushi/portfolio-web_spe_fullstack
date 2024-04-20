import { fetchChatCompletion } from '@/lib/perplexityAPI';

export async function POST(request: Request) {
  const requestData = {
    model: 'mistral-7b-instruct',
    messages: [
      { role: 'system', content: 'Be precise and concise.' },
      { role: 'user', content: 'How many teeth has a adult male human?' },
    ],
  };

  try {
    const response = await fetchChatCompletion(requestData);
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch chat completion' }), { status: 500 });
  }
}
