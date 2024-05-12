"use client";
import React, { useState, useCallback } from "react";
import { SelectDataType } from "./selectNumber";
import { NumQuestions } from "@/types/quiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch } from "hooks";
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
}) => {
  const dispatch = useAppDispatch();

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
          quizData: quizData,
        }),
      );
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

      dispatch(
        setRecallData({
          videoId: quizTitle,
          quizId: data.quizId,
          quizData: data,
        }),
      );

      setQuizReady((prevState) => ({
        ...prevState,
        ...quizDataAvailable.reduce((acc: { [key: string]: boolean }, key) => {
          acc[key] = true;
          return acc;
        }, {}),
      }));

      setIsDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch quiz data:", error);
    }
  }, [dispatch, quizTitle]);

  const handleSelectNumber = (value: NumQuestions) => {
    setNumQuestions(value);
    dispatch(setSelectedQuizData(value));
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

  const scoreRatio = lastScore / length;

  const CustomColor =
    scoreRatio >= 0.8
      ? `border-[2px] border-green-500`
      : scoreRatio >= 0.6
        ? `border-[2px] border-yellow-200`
        : scoreRatio >= 0.4
          ? `border-[2px] border-yellow-500`
          : scoreRatio >= 0.2
            ? `border-[2px] border-orange-500`
            : `border-[2px] border-red-500`;

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
                disabled={numQuestions === "Select"}
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
              START
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
