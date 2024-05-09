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

export default async function TestRoute() {
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "content-type": "application/json",
      },
    });
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

  const data = await fetchRecallAll(token);
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function fetchRecallAll(token: string): Promise<CarouselData> {
  "use server";
  try {
    const response = await fetch("http://localhost:3000/api/recall/quiz/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error("Network response was not ok");
    }
    const fetchedData: CarouselData = await response.json();
    return fetchedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
