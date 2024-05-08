"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { SelectDataType } from "./selectNumber";
import { SelectNumber } from "../quiz/ui/selectNumber";
import { NumQuestions, QuestionsState } from "@/types/quiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "hooks";
import {
  setRecallData,
  setSelectedQuizData,
  setQuizStart,
} from "slices/recallSlice";
import { AlertRegenerate } from "../ui/custom/alert-regeneratate";

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
  // const { selectedQuizData } = useAppSelector((state) => state.recall);
  // const [isQuizDataFetched, setIsQuizDataFetched] = useState<boolean>(false);

  const [numQuestions, setNumQuestions] = useState<NumQuestions>("Select");

  // ...

  const [quizReady, setQuizReady] = useState<{ [key: string]: boolean }>({});

  const [selectedQuizLength, setSelectedQuizLength] =
    useState<string>("Select");

  const fetchQuizData = async (value: NumQuestions) => {
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
      setNumQuestions(value);
      dispatch(setSelectedQuizData(value));
      // setIsQuizDataFetched(true);

      setQuizReady((prevState) => ({
        ...prevState,
        [value]: quizDataAvailable.includes(value),
      }));
    } catch (error) {
      console.error("Failed to fetch quiz data:", error);
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

  const generateNewQuiz = async (
    selectedNumber: NumQuestions,
    title: string,
  ) => {
    try {
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
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Handle response data or update state as needed
    } catch (error) {
      console.error("Failed to regenerate quiz:", error);
    }
  };

  // const generateNewQuiz = (selectedNumber: NumQuestions, title: string) => {
  //   console.log("TITLE ->", title);
  //   console.log("length ->", selectedNumber);
  // };

  const handleSelectNumber = (value: NumQuestions) => {
    fetchQuizData(value);
  };

  const CustomColor =
    lastScore / length >= 0.5
      ? `border-[2px] border-green-500`
      : `border-[2px] border-red-500`;

  return (
    <div
      className={`relative z-10 my-2 rounded-lg border-2 p-4 shadow-lg sm:flex sm:h-64 sm:w-full sm:max-w-2xl sm:flex-col sm:items-center sm:justify-between lg:h-80 lg:max-w-5xl ${CustomColor}`}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 z-[-1] rounded-lg ${CustomColor} blur-lg filter`}
      ></div>

      <div className="mb-4 flex flex-col sm:mb-0 sm:w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{quizTitle}</h2>
          <AlertRegenerate
            selectedNumber={numQuestions}
            trigger={
              <button
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
            description="Which Size do you want?"
            cancelText="No"
            actionText="Yes"
            onAction={(selectedNumber) =>
              generateNewQuiz(selectedNumber, quizTitle)
            }
          />
        </div>
        <p className="text-base">Last quiz length: {length}</p>
      </div>
      <div className="mb-4 sm:mb-0 sm:flex sm:w-full sm:items-center sm:justify-end">
        <div className="text-sm ">
          <p>
            Last score: {lastScore}/{length}
          </p>
          <p>
            Highest score: {highestScore}/{highestScoreTotal}
          </p>
        </div>
      </div>
      <div className="mb-4 sm:mb-0 sm:flex sm:w-full sm:items-end sm:justify-between">
        <div>
          <p className="text-sm">Attempt number: {attemptNumber}</p>
          <p className="text-sm">Last attempt: {lastAttempt}</p>
        </div>
        <div className="mt-4 flex gap-3">
          <SelectDataType
            value={numQuestions}
            onValueChange={handleSelectNumber}
          />
          <Button
            onClick={() => startQuiz()}
            disabled={!quizReady[numQuestions]}
            className={`w-full rounded px-3 py-1 text-sm sm:h-9 sm:w-auto ${!quizReady[numQuestions] ? "cursor-not-allowed opacity-50" : ""}`}
          >
            START
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
