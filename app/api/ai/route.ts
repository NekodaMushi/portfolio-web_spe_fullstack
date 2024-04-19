import { postChatCompletion } from '@/lib/perplexityAPI'

async function getChatCompletion() {
    try {
        const requestData = {
            model: 'mistral-7b-instruct',
            messages: [{ role: 'user', content: 'Hello, how can I use the Perplexity API?' }]
        };
        const response = await postChatCompletion(requestData);
        console.log(response);
    } catch (error) {
        console.error('Failed to fetch chat completion:', error);
    }
}
