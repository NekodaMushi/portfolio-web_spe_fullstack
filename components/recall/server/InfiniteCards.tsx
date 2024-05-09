// import Search from "/search";
// import { data } from "./_data";
import CustomCard from "../client/CustomCard";
import LoadMore from "../client/LoadMore";
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
  console.log("Darta====>", data);

  return (
    <main className="flex flex-col gap-10 px-8 py-16 sm:p-16">
      <h2 className="text-3xl font-bold text-white">Explore </h2>

      <section className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      </section>
    </main>
  );
}

export default InfiniteCards;
