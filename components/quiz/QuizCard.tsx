"use client";
import React, { useState } from "react";
import QuizButton from "./ui/quizButton";
import QuestionCard from "./QuestionCard";
import QuizEnd from "./QuizEnd";

import { QuestionsState } from "@/types/quiz";

import { IconSquareRoundedX } from "@tabler/icons-react";
import { AlertCancel } from "@/components/ui/custom/alert-dialog";

import { useAppDispatch } from "@/lib/redux/hooks";
import { resetQuiz } from "slices/quizSlice";

interface QuizCardProps {
  questions: QuestionsState;
  totalQuestions: number;
  quizId: string;
  videoId: string;
  onSetQuizCancel: () => void;
}

const QuizCard = ({
  questions,
  totalQuestions,
  quizId,
  videoId,
  onSetQuizCancel,
}: QuizCardProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState<boolean>(false);

  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  const isQuestionAnswered = userAnswers[currentQuestionIndex] ? true : false;

  const dispatch = useAppDispatch();

  const handleOnAnswerClick = (
    answer: string,
    currentQuestionIndex: number,
  ) => {
    if (isQuestionAnswered) return;
    const isCorrect = questions[currentQuestionIndex].correct_answer === answer;

    if (isCorrect) setScore((prev) => prev + 1);

    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleChangeQuestion = (step: number) => {
    const newQuestionIndex = currentQuestionIndex + step;

    if (newQuestionIndex < 0 || newQuestionIndex >= totalQuestions) return;

    setCurrentQuestionIndex(newQuestionIndex);
  };

  const handleEndOfQuiz = async () => {
    setQuizEnded(true);
    try {
      const response = await fetch(`/api/recall/quiz/completed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalQuestions: totalQuestions,
          attemptNumber: 1,
          incorrectAnswers: totalQuestions - score,
          quizId: quizId,
          videoId: videoId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Quiz data saved successfully:", data);
      } else {
        console.error("Failed to save quiz data");
      }
    } catch (error) {
      console.error("Error saving quiz data:", error);
    }
  };

  const handleReset = () => {
    dispatch(resetQuiz());

    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers({});

    onSetQuizCancel();
  };

  return (
    <div className="relative text-center">
      {quizEnded ? (
        <QuizEnd
          score={score}
          totalQuestions={totalQuestions}
          handleReset={handleReset}
        />
      ) : (
        <>
          <AlertCancel
            trigger={
              <button
                className="absolute right-0 top-0 z-10"
                // onClick={() => handleReset()}
              >
                <IconSquareRoundedX className="h-7 w-7" />
              </button>
            }
            title="Are you sure you want to quit?"
            description="All your progression will be lost"
            cancelText="No"
            actionText="Yes"
            onAction={handleReset}
          />
          <p className="p-8 text-[20px] font-bold">Score: {score}</p>

          <p className="pb-2 text-[18px] font-bold text-[rgb(80,172,128)]">
            Question {currentQuestionIndex + 1} out of {totalQuestions}
          </p>

          <QuestionCard
            currentQuestionIndex={currentQuestionIndex}
            question={questions[currentQuestionIndex].question}
            answers={questions[currentQuestionIndex].choices}
            userAnswer={userAnswers[currentQuestionIndex]}
            correctAnswer={questions[currentQuestionIndex].correct_answer}
            onClick={handleOnAnswerClick}
          />

          <div className="mt-16 flex justify-between">
            <QuizButton text="Prev" onClick={() => handleChangeQuestion(-1)} />
            <QuizButton
              text={
                currentQuestionIndex === totalQuestions - 1 ? "End" : "Next"
              }
              onClick={
                currentQuestionIndex < totalQuestions - 1
                  ? () => handleChangeQuestion(1)
                  : () => handleEndOfQuiz()
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default QuizCard;
