"use client";
import React, { useState } from "react";
import QuizButton from "./ui/quizButton";
import QuestionCard from "./QuestionCard";
import { QuestionsState } from "@/types/quiz";

import QuizEnd from "./QuizEnd";

type Props = {
  questions: QuestionsState;
  totalQuestions: number;
};

const QuizCard = ({ questions, totalQuestions }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState<boolean>(false);

  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  const isQuestionAnswered = userAnswers[currentQuestionIndex] ? true : false;

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

  const handleEndOfQuiz = () => {
    setQuizEnded(true);
  };

  return (
    <div className="text-center">
      {quizEnded ? (
        <QuizEnd score={score} totalQuestions={totalQuestions} />
      ) : (
        <>
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
