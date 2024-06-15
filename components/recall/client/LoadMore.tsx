"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import fetchCards from "../server/action";
import CustomCard from "./CustomCard";

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

let page = 2;
function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<CarouselData>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadCount, setLoadCount] = useState(0);

  useEffect(() => {
    if (inView && !isLoading && loadCount < 7) {
      setIsLoading(true);

      fetchCards(page)
        .then((resData) => {
          setData((prevData) => [...prevData, ...resData]);
          page++;
          setLoadCount((prevCount) => prevCount + 1);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        });
    }
  }, [inView, isLoading, loadCount]);

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
      {loadCount < 7 && <div ref={ref} style={{ height: "1px" }}></div>}
    </>
  );
}

export default LoadMore;
