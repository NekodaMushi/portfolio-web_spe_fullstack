import { createMocks, MockRequest } from 'node-mocks-http';
import { POST } from '@/app/api/ai/quiz/generate/route';
import { users, transcripts, quizzes } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import fetchMock from 'jest-fetch-mock';

import * as schema from "@/db/schema";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {
  schema,
});

jest.mock('@/lib/openaiAPI', () => ({
  fetchChatCompletion: jest.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content: JSON.stringify([
            {
              question: "Sample question?",
              choices: { A: "Option A", B: "Option B", C: "Option C", D: "Option D" },
              correct_answer: "A",
            },
          ]),
        },
      },
    ],
  }),
}));

jest.mock('auth', () => ({
  auth: jest.fn().mockResolvedValue({
    user: { id: 'user1', name: 'Test User' },
  }),
}));

jest.mock('@/lib/validators/doubleAiChecking', () => ({
  validateAndCorrectQuizContent: jest.fn((content) => Promise.resolve(content)),
}));

function mockRequestToRequest(req: MockRequest<any>): Request {
  const { method, url, headers, body } = req;

  const requestInit: RequestInit = {
    method,
    headers: new Headers(headers as Record<string, string>),
    body: JSON.stringify(body),
  };

  return new Request(url as string, requestInit);
}

describe('POST /api/quiz/generate', () => {
  beforeAll(async () => {
    fetchMock.resetMocks();
    await db.delete(transcripts);
    await db.delete(quizzes);
    await db.insert(users).values({
      id: 'user1',
      name: 'Test User',
      email: 'testuser@example.com',
    });
    await db.insert(transcripts).values({
      userId: 'user1',
      videoId: 'video1',
      content: 'Sample transcript content',
      latest: 1,
    });
  });

  afterAll(async () => {
    await db.delete(transcripts);
    await db.delete(quizzes);
  });

  it('should generate a quiz and store it in the database', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/ai/quiz/generate',
      query: {
        numQuestions: '5',
      },
    });

    const request = mockRequestToRequest(req);

    const response = await POST(request);

    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(responseData).toMatchObject({
      quizData: expect.any(String),
      videoId: 'video1',
      quizId: expect.any(String),
    });

    const storedQuiz = await db
      .select()
      .from(quizzes)
      .where(and(eq(quizzes.userId, 'user1'), eq(quizzes.videoId, 'video1')))
      .limit(1);

    expect(storedQuiz.length).toBe(1);
    expect(storedQuiz[0].quizDataShort).toBeDefined();
  });

  it('should return 401 if user is not authenticated', async () => {
    jest.mock('auth', () => ({
      auth: jest.fn().mockResolvedValue(null),
    }));

    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/ai/quiz/generate',
      query: {
        numQuestions: '5',
      },
    });

    const request = mockRequestToRequest(req);

    const response = await POST(request);

    expect(response.status).toBe(401);
    const responseData = await response.json();
    expect(responseData).toMatchObject({
      error: 'Unauthorized',
    });
  });

  it('should return 404 if no transcripts are found for the user', async () => {
    await db.delete(transcripts);

    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/ai/quiz/generate',
      query: {
        numQuestions: '5',
      },
    });

    const request = mockRequestToRequest(req);

    const response = await POST(request);

    expect(response.status).toBe(404);
    const responseData = await response.json();
    expect(responseData).toMatchObject({
      message: 'No transcripts found for the user',
    });


    await db.insert(transcripts).values({
      userId: 'user1',
      videoId: 'video1',
      content: 'Sample transcript content',
      latest: 1,
    });
  });
});
