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

  if (data === null) {
    return (
      <div className="flex h-80 items-center justify-center">
        <div>No data available</div>
      </div>
    );
  } else if (data.length === 0) {
    console.log("try", data.length);
    console.log("try", learningQuizzes.length);
    if (learningQuizzes.length === 0) {
      console.log("test");
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
            <div>No more quiz to learn today, check Review !</div>
          </div>
        </>
      );
    }
    if (reviewQuizzes.length === 0) {
      console.log("test");
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
            <div>No more quiz to review today, check Learning !</div>
          </div>
        </>
      );
    }

    return (
      <div className="flex h-96 items-center justify-center">
        <div>No more quiz to review today, please generate !</div>
      </div>
    );
  } else {
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
          <h1 className=" flex-1 text-center text-3xl font-bold">
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
}
