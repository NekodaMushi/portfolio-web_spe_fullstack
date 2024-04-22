import { fetchChatCompletion } from '@/lib/perplexityAPI';



describe('fetchChatCompletion', () => {
  it('should fetch chat completion successfully', async () => {
    const requestData = {
      model: 'mistral-7b-instruct',
      messages: [
        { role: 'system', content: 'Be precise and concise.' },
        { role: 'user', content: 'How many teeth does an adult male human have?' },
      ],
    };

    const mockResponse = {
      id: 'mock-id',
      choices: [{ message: { content: 'An adult male human typically has 32 teeth.' } }],
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    });

    const response = await fetchChatCompletion(requestData);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.perplexity.ai/chat/completions',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        }),
        body: JSON.stringify(requestData),
      })
    );

    expect(response).toEqual(mockResponse);
  });

});
