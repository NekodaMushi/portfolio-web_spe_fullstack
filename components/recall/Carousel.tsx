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

interface CarouselDataItem {
  successRate: number;
  attemptNumber: number;
  totalQuestions: number;
  incorrectAnswers: number;
  updatedAt: string;
  videoId: string;
}

type CarouselData = CarouselDataItem[];

export function Carousel() {
  const [data, setData] = useState<CarouselData>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/recall/quiz/all");
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
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
    <div className="embla w-full overflow-hidden sm:mt-2" ref={emblaRef}>
      <div className="embla__container">
        {data.map((item, index) => (
          <div
            key={index}
            className="embla__slide relative flex h-full flex-col items-center justify-center"
          >
            <CustomCard
              title={item.videoId}
              length={item.totalQuestions}
              lastScore={item.totalQuestions - item.incorrectAnswers}
              highestScore={Math.max(
                ...data.map((d) => d.totalQuestions - d.incorrectAnswers),
              )}
              lastAttempt={new Date(item.updatedAt).toLocaleDateString()}
              attemptNumber={item.attemptNumber}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          className="embla__prev m-2 rounded-full border-2 border-solid p-3 text-xl"
          onClick={scrollPrev}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          className="embla__next m-2 rounded-full border-2 border-solid p-3 text-xl"
          onClick={scrollNext}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
