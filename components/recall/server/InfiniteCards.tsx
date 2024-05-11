"use server";
// import Search from "/search";
// import { data } from "./_data";
import CustomCard from "../client/CustomCard";
import TempFixFront from "../client/TempFixFront";
// import LoadMore from "../client/LoadMore";
// import CustomCard from "./CustomCard";

import TestRoute from "./action";

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
  const response = await TestRoute();
  if (!response.ok) {
    console.error("Failed to fetch data");
  }
  const data: CarouselData = await response.json();
  // console.log("Darta====>", data);

  return (
    <main className="vertical-scroll -mt-20 flex h-screen flex-col items-center justify-center gap-64 overflow-y-scroll pr-4 sm:pt-56">
      {/* pt-80 */}
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
      {/* <LoadMore /> */}
    </main>
  );
}

export default InfiniteCards;
