"use client";
import React, { useState, useCallback, useEffect } from "react";
import { SelectDataType } from "./selectNumber";
import { NumQuestions, QuestionsState } from "@/types/quiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "hooks";
import {
  setRecallData,
  setSelectedQuizData,
  setQuizStart,
} from "slices/recallSlice";

import { AlertRegenerate } from "../../ui/custom/alert-regeneratate";
import { Button } from "../../ui/button";

interface CardProps {
  quizTitle: string;
  length: number;
  lastScore: number;
  successRate: number;
  highestScore: number;
  highestScoreTotal: number;
  lastAttempt: string;
  attemptNumber: number;
}

const CustomCard: React.FC<CardProps> = ({
  quizTitle,
  length,
  lastScore,
  highestScore,
  highestScoreTotal,
  lastAttempt,
  attemptNumber,
  successRate,
}) => {
  const dispatch = useAppDispatch();
  const selectedQuizData = useAppSelector(
    (state) => state.recall.selectedQuizData,
  );

  const [numQuestions, setNumQuestions] = useState<NumQuestions>("Select");
  const [quizReady, setQuizReady] = useState<{ [key: string]: boolean }>({});
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateNewQuiz = async (
    selectedNumber: NumQuestions,
    title: string,
  ) => {
    try {
      setIsGenerating(true);
      const response = await fetch("/api/ai/quiz/regenerate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numQuestions: selectedNumber,
          videoTitle: title,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const quizData = JSON.parse(data.quizContent);

      dispatch(
        setRecallData({
          videoId: data.videoId,
          quizId: data.quizId,
          quizData: { [selectedNumber]: quizData },
        }),
      );
      dispatch(setSelectedQuizData(selectedNumber)); // Ensure the selected data is set
      dispatch(setQuizStart(true));
    } catch (error) {
      console.error("Failed to regenerate quiz:", error);
    } finally {
      setIsGenerating(false); // Ensure isGenerating is reset
    }
  };

  const fetchQuizData = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/recall/quiz?videoId=${encodeURIComponent(quizTitle)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      const quizKeys = [
        "quizDataShort",
        "quizDataMedium",
        "quizDataLarge",
        "quizDataExam",
        "quizDataTest",
      ];

      const quizDataAvailable = quizKeys.filter((key) => data[key] !== null);

      const quizData = quizKeys.reduce(
        (acc, key) => {
          if (data[key] !== null) {
            acc[key as NumQuestions] = data[key];
          }
          return acc;
        },
        {} as { [key in NumQuestions]?: QuestionsState },
      );

      dispatch(
        setRecallData({
          videoId: quizTitle,
          quizId: data.quizId,
          quizData: quizData as { [key in NumQuestions]?: QuestionsState },
        }),
      );

      setQuizReady((prevState) => ({
        ...prevState,
        ...quizDataAvailable.reduce((acc: { [key: string]: boolean }, key) => {
          acc[key as string] = true; // Ensure keys are treated as strings
          return acc;
        }, {}),
      }));

      setIsDataLoaded(true);
      if (
        numQuestions !== "Select" &&
        quizDataAvailable.includes(numQuestions)
      ) {
        dispatch(setSelectedQuizData(numQuestions));
      }
    } catch (error) {
      console.error("Failed to fetch quiz data:", error);
    }
  }, [dispatch, quizTitle, numQuestions]);

  useEffect(() => {
    if (isDataLoaded && numQuestions !== "Select" && quizReady[numQuestions]) {
      dispatch(setQuizStart(true));
    }
  }, [isDataLoaded, numQuestions, quizReady, dispatch]);

  const handleSelectNumber = (value: NumQuestions) => {
    setNumQuestions(value);
    if (isDataLoaded) {
      dispatch(setSelectedQuizData(value));
    }
  };

  const startQuiz = () => {
    if (quizReady[numQuestions]) {
      dispatch(setQuizStart(true));
    } else {
      console.error(
        "No quiz data available for the selected number of questions",
      );
    }
  };

  const CustomColor =
    successRate >= 90
      ? `border-[2px] border-score-90`
      : successRate >= 80
        ? `border-[2px] border-score-80`
        : successRate >= 70
          ? `border-[2px] border-score-70`
          : successRate >= 60
            ? `border-[2px] border-score-60`
            : successRate >= 50
              ? `border-[2px] border-score-50`
              : successRate >= 40
                ? `border-[2px] border-score-40`
                : successRate >= 30
                  ? `border-[2px] border-score-30`
                  : successRate >= 20
                    ? `border-[2px] border-score-20`
                    : `border-[2px] border-score-10`;

  return (
    <div
      className={`relative z-10 my-2 rounded-lg border-2 p-4 shadow-lg sm:flex sm:h-64 sm:w-full sm:max-w-2xl sm:flex-col sm:items-center sm:justify-between lg:h-80 lg:max-w-5xl ${CustomColor} `}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 z-[-1] rounded-lg ${CustomColor} blur-lg filter`}
      ></div>

      <div
        style={{ opacity: isGenerating ? 0.5 : 1 }}
        className="mb-4 flex flex-col sm:mb-0 sm:w-full"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{quizTitle}</h2>
          <AlertRegenerate
            selectedNumber={numQuestions}
            trigger={
              <button
                disabled={numQuestions === "Select" || isGenerating}
                className={`${CustomColor} -mt-6 rounded px-3 py-1 text-sm sm:mt-0`}
              >
                {!quizReady[numQuestions] ? (
                  <FontAwesomeIcon
                    icon={faRotateRight}
                    className="icon-blink"
                    style={{ color: "grey" }}
                  />
                ) : (
                  <FontAwesomeIcon icon={faRotateRight} />
                )}
              </button>
            }
            title="Asking AI to generate a quiz."
            description="Quiz will be launched after generation"
            cancelText="No"
            actionText="Yes"
            onAction={() => generateNewQuiz(numQuestions, quizTitle)}
          />
        </div>
        <p className="text-base">Last quiz length: {length}</p>
      </div>
      <div
        style={{ opacity: isGenerating ? 0.5 : 1 }}
        className="mb-4 sm:mb-0 sm:flex sm:w-full sm:items-center sm:justify-end"
      >
        <div className="text-sm ">
          <p>
            Last score: {lastScore}/{length}
          </p>
          <p>
            Highest score: {highestScore}/{highestScoreTotal}
          </p>
        </div>
      </div>
      <div
        style={{ opacity: isGenerating ? 0.5 : 1 }}
        className="mb-4 sm:mb-0 sm:flex sm:w-full sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-sm">Attempt number: {attemptNumber}</p>
          <p className="text-sm">Last attempt: {lastAttempt}</p>
        </div>
        <div className="mt-4 flex gap-3">
          <SelectDataType
            value={numQuestions}
            onValueChange={handleSelectNumber}
            quizReady={quizReady}
          />
          {!isDataLoaded && (
            <Button
              disabled={isGenerating}
              onClick={fetchQuizData}
              className="w-full rounded px-3 py-1 text-sm sm:h-9 sm:w-40"
            >
              Load
            </Button>
          )}
          {isDataLoaded && (
            <Button
              onClick={startQuiz}
              disabled={!quizReady[numQuestions] || isGenerating}
              className={`w-full rounded px-3 py-1 text-sm sm:h-9 sm:w-40 ${
                !quizReady[numQuestions] ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              PICK A SIZE
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
