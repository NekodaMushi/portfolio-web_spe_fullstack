"use client";

import QuizLayout from "@/components/quiz/QuizLayout";
import { QuizStart } from "@/components/quiz/QuizStart";
import { useState } from "react";
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
        <QuizLayout onSetQuizCancel={handleQuizCancel} />
      ) : (
        <QuizStart onSetQuizReady={handleQuizReady} />
      )}
    </>
  );
}
