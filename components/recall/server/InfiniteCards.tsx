"use server";
import CustomCard from "../client/CustomCard";
import LoadMore from "../client/LoadMore";
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
      <div className="flex flex-col items-center gap-2">
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
            successRate={item.successRate}
          />
        ))}
        <LoadMore />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

export default InfiniteCards;
