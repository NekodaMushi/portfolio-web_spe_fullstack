const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.OPENAI_API_KEY;


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
    body: JSON.stringify({
      model: requestData.model,
      messages: requestData.messages,
      max_tokens: 4096,
      n: 1,
      stop: null,
      temperature: 0.7,
    }),
  };

  try {
    const response = await fetch(API_URL, options);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from OpenAI API:', errorData);
      throw new Error(errorData.error.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chat completion:', error);
    throw error;
  }
}
