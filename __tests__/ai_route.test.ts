import { POST } from '@/app/api/ai/generate/quiz/route';
import { fetchChatCompletion } from '@/lib/perplexityAPI';

jest.mock('@/lib/perplexityAPI');

describe('POST', () => {
  it('should return a successful response', async () => {
    const mockResponse = {
      id: 'mock-id',
      choices: [{ message: { content: 'An adult male human typically has 32 teeth.' } }],
    };

    (fetchChatCompletion as jest.Mock).mockResolvedValue(mockResponse);

    const mockRequest = {
      method: 'POST',
      json: jest.fn().mockResolvedValue({}),
    } as unknown as Request;

    const response = await POST(mockRequest);

    expect(fetchChatCompletion).toHaveBeenCalledWith({
      model: 'mistral-7b-instruct',
      messages: [
        { role: 'system', content: 'Be precise and concise.' },
        { role: 'user', content: 'How many teeth has a adult male human?' },
      ],
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockResponse);
  });


});
