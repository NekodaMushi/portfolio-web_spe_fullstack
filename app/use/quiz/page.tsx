"use client";

import LoadingQuiz from "@/components/LoadingQuiz";
import QuizGame from "@/components/quiz/QuizGame";
import { QuizStart } from "@/components/quiz/QuizStart";
import { useState } from "react";

import { QuestionsState } from "@/types/quiz";

export default function Quiz() {
  const [quizReady, setQuizReady] = useState<boolean>(false);

  const handleQuizReady = () => {
    setQuizReady(true);
  };

  return (
    <>
      {quizReady ? (
        <QuizGame />
      ) : (
        <QuizStart onSetQuizReady={handleQuizReady} />
      )}
    </>
  );
}
