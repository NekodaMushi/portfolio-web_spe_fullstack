import CustomCard from "../client/CustomCard";
import LoadMore from "../client/LoadMore";
import { CarouselData } from "@/types/quiz";

export default function InfiniteCards({ data }: { data: CarouselData }) {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

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
}
