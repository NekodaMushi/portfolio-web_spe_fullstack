"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import fetchCards from "../server/action";
import CustomCard from "./CustomCard";

// import { fetchRecall } from "./action";
// import AnimeCard, { AnimeProp } from "./AnimeCard";
// import Spinner from "../ui/spinner";

let page = 2;

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

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<CarouselData>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inView && !isLoading) {
      setIsLoading(true);

      console.log(page);
      console.log("LOAD");
      fetchCards(page)
        .then((resData) => {
          setData((prevData) => [...prevData, ...resData]);
          page++;
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        });
    }
  }, [inView, isLoading]);

  return (
    <>
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
      {isLoading && <Spinner />}
      <div ref={ref} style={{ height: "1px" }}></div>
    </>
  );
}

export default LoadMore;
