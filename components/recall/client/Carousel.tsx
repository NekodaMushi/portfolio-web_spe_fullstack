"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import CustomCard from "./CustomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../ui/spinner";
import Autoplay from "embla-carousel-autoplay";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);

  const [selectedToggle, setSelectedToggle] = useState("Review");
  const [learningQuizzes, setLearningQuizzes] = useState<CarouselData>([]);
  const [reviewQuizzes, setReviewQuizzes] = useState<CarouselData>([]);
  const [data, setData] = useState<CarouselData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/recall/quiz/spaced-repetition");
        const fetchedData = await response.json();
        setLearningQuizzes(fetchedData.learningAndTransitionPhaseQuizzes || []);
        setReviewQuizzes(fetchedData.reviewPhaseQuizzes || []);
        updateDisplayedData(selectedToggle);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLearningQuizzes([]);
        setReviewQuizzes([]);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateDisplayedData = useCallback(
    (toggleValue: string) => {
      setData(toggleValue === "Learning" ? learningQuizzes : reviewQuizzes);
    },
    [learningQuizzes, reviewQuizzes],
  );

  useEffect(() => {
    updateDisplayedData(selectedToggle);
  }, [selectedToggle, updateDisplayedData]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (isLoading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (data === null || data.length === 0) {
    let message = "";
    if (learningQuizzes.length === 0) {
      message = "No need to learn or review today, Please generate new quiz!";
    } else if (reviewQuizzes.length === 0) {
      message = "No quiz to review today, check Learning!";
    }

    return (
      <>
        <ToggleGroup
          type="single"
          value={selectedToggle}
          onValueChange={setSelectedToggle}
          defaultValue="Review"
        >
          <ToggleGroupItem value="Learning">Learning</ToggleGroupItem>
          <ToggleGroupItem value="Review">Review</ToggleGroupItem>
        </ToggleGroup>

        <div className="flex h-96 items-center justify-center">
          <div>{message}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <ToggleGroup
        type="single"
        value={selectedToggle}
        onValueChange={setSelectedToggle}
        defaultValue="Review"
      >
        <ToggleGroupItem value="Learning">Learning</ToggleGroupItem>
        <ToggleGroupItem value="Review">Review</ToggleGroupItem>
      </ToggleGroup>

      <div className="mb-4 flex items-center">
        <h1 className="flex-1 text-center text-3xl font-bold">
          Spaced Learning Repetition
        </h1>
      </div>
      <div className="embla w-full overflow-hidden sm:mt-2" ref={emblaRef}>
        <div className="embla__container">
          {data.map((item, index) => (
            <div
              key={index}
              className="embla__slide relative flex h-full flex-col items-center justify-center"
            >
              <CustomCard
                quizTitle={item.videoId}
                length={item.totalQuestions}
                lastScore={item.totalQuestions - item.incorrectAnswers}
                highestScore={item.highestScore}
                highestScoreTotal={item.highestScoreTotal}
                lastAttempt={new Date(item.updatedAt).toLocaleDateString()}
                attemptNumber={item.attemptNumber}
                successRate={item.successRate}
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
    </>
  );
}
