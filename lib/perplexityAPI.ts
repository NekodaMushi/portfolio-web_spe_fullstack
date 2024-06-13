const API_URL = 'https://api.perplexity.ai/chat/completions';
const API_KEY = process.env.PERPLEXITY_API_KEY


interface RequestData {
  model: string;
  messages: Array<{ role: string; content: string }>;
}

export async function fetchChatCompletion(requestData: RequestData) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(requestData),
  };

  try {
    const response = await fetch(API_URL, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chat completion:', error);
    throw error;
  }
}



