"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import fetchCards from "../server/action";
import CustomCard from "./CustomCard";

let page = 2;
let loadCount = 8; //temp

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
    if (inView && !isLoading && loadCount < 10) {
      // temp
      setIsLoading(true);

      fetchCards(page)
        .then((resData) => {
          setData((prevData) => [...prevData, ...resData]);
          page++;
          loadCount++; // temp
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
      {loadCount < 10 && <div ref={ref} style={{ height: "1px" }}></div>}
    </>
    // temp
  );
}

export default LoadMore;
