const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY; 
const API_URL = 'https://api.perplexity.ai/chat/completions';

interface ChatCompletionRequest {
    model: string;
    messages: Array<{ role: string; content: string }>;
}



async function postChatCompletion(requestData: ChatCompletionRequest) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
        },
        body: JSON.stringify(requestData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export { postChatCompletion }
