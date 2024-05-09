"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import CustomCard from "./CustomCard";
import Autoplay from "embla-carousel-autoplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../ui/spinner";
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

export function Carousel() {
  const [data, setData] = useState<CarouselData | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  // , [
  //   Autoplay({ delay: 4000 }),
  // ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/recall/quiz/all");
        const fetchedData = await response.json();
        setData(Array.isArray(fetchedData) ? fetchedData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Set data to an empty array on error to stop the spinner
      }
    };

    fetchData();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div>No data available</div>
    </div>
  );

  //   if (data === null) {
  //     return (
  //       <div className="flex h-screen items-center justify-center">
  //         <Spinner />
  //       </div>
  //     );
  //   } else if (data.length === 0) {
  //     return (
  //       <div className="flex h-screen items-center justify-center">
  //         <div>No data available</div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="embla w-full overflow-hidden sm:mt-2" ref={emblaRef}>
  //         <div className="embla__container">
  //           {data.map((item, index) => (
  //             <div
  //               key={index}
  //               className="embla__slide relative flex h-full flex-col items-center justify-center"
  //             >
  //               <CustomCard
  //                 quizTitle={item.videoId}
  //                 length={item.totalQuestions}
  //                 lastScore={item.totalQuestions - item.incorrectAnswers}
  //                 highestScore={item.highestScore}
  //                 highestScoreTotal={item.highestScoreTotal}
  //                 lastAttempt={new Date(item.updatedAt).toLocaleDateString()}
  //                 attemptNumber={item.attemptNumber}
  //               />
  //             </div>
  //           ))}
  //         </div>
  //         <div className="flex justify-between">
  //           <button
  //             className="embla__prev m-2 rounded-full border-2 border-solid p-3 text-xl"
  //             onClick={scrollPrev}
  //           >
  //             <FontAwesomeIcon icon={faChevronLeft} />
  //           </button>
  //           <button
  //             className="embla__next m-2 rounded-full border-2 border-solid p-3 text-xl"
  //             onClick={scrollNext}
  //           >
  //             <FontAwesomeIcon icon={faChevronRight} />
  //           </button>
  //         </div>
  //       </div>
  //     );
  //   }
  // }
}
