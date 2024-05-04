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

  const handleQuizCancel = () => {
    setQuizReady(false);
  };

  return (
    <>
      {quizReady ? (
        <QuizGame onSetQuizCancel={handleQuizCancel} />
      ) : (
        <QuizStart onSetQuizReady={handleQuizReady} />
      )}
    </>
  );
}
