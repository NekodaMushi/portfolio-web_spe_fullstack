// action.ts
"use server";
import { auth } from "auth";
import jwt from "jsonwebtoken";

interface CarouselDataItem {
  successRate: number;
  attemptNumber: number;
  totalQuestions: number;
  incorrectAnswers: number;
  highestScore: number;
  highestScoreTotal: number;
  updatedAt: string;
  videoId: string;
}

type CarouselData = CarouselDataItem[];

export default async function fetchCards(page: number): Promise<CarouselData> {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const sessionUser = session?.user;

  if (!process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET is not defined in the environment variables.");
  }

  const token = jwt.sign(
    {
      id: sessionUser.id,
      email: sessionUser.email,
    },
    process.env.AUTH_SECRET,
    { expiresIn: "1h" },
  );

  return fetchRecallAll(token, page);
}

export async function fetchRecallAll(token: string, page: number): Promise<CarouselData> {
  try {
    const response = await fetch(`http://localhost:3000/api/recall/quiz/all?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error("Network response was not ok");
    }
    const fetchedData: CarouselData = await response.json();
    console.log("Server ACTION");
    return fetchedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
