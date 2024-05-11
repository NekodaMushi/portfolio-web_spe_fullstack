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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (inView) {
      const delay = 500;
      const timeoutId = setTimeout(() => {
        fetchCards(page)
          .then((response) => {
            if (!response.ok) {
              alert("Failed------------");
              throw new Error("Failed to fetch data");
            }
            alert("Good------------");
            return response.json(); // Parse the JSON data from the response
          })
          .then((resData) => {
            setData((prevData) => [...prevData, ...resData]); // Update state with the new data
            page++;
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setIsLoading(false);
          });
      }, delay);

      console.log("LOAD------------");
      return () => clearTimeout(timeoutId);
    }
  }, [inView, data, isLoading]);
  console.log("LOAD------------OUT");
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
        />
      ))}
      <section className="flex w-full items-center justify-center">
        <div ref={ref}>{inView && isLoading && <Spinner />}</div>
      </section>
    </>
  );
}

export default LoadMore;
