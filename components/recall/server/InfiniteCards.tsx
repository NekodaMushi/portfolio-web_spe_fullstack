// InfiniteCards.tsx
"use server";
import CustomCard from "../client/CustomCard";
import LoadMore from "../client/LoadMore";
import TempFixFront from "../client/TempFixFront";
import fetchCards from "./action";

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

async function InfiniteCards() {
  try {
    const data: CarouselData = await fetchCards(1);

    return (
      <main className="vertical-scroll -mt-20 flex h-screen flex-col items-center justify-center gap-64 overflow-y-scroll pr-4 sm:pt-56">
        <TempFixFront />
        
        {data.map((item, index) => (
          <CustomCard
            key={index}
            quizTitle={item.videoId}
            length={item.totalQuestions}
            lastScore={item.totalQuestions - item.incorrectAnswers}
            highestScore={item.highestScore}
            highestScoreTotal={item.highestScoreTotal}
            lastAttempt={new Date(item.updatedAt).toLocaleDateString()}
            attemptNumber={item.attemptNumber}
          />
        ))}
        <LoadMore />
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

export default InfiniteCards;
