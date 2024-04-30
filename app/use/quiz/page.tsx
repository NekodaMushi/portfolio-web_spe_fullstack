"use client";

import LoadingQuiz from "@/components/LoadingQuiz";
import QuizGame from "@/components/quiz/QuizGame";
import { QuizStart } from "@/components/quiz/QuizStart";
import { useState } from "react";

import { QuestionsState } from "@/types/quiz";

export default function Quiz() {
  const [quizReady, setQuizReady] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<QuestionsState | null>(null);

  const handleQuizGenerated = (data: QuestionsState) => {
    setQuizData(data);
  };

  const handleQuizReady = () => {
    if (quizData !== null) {
      setQuizReady(true);
    }
  };

  return (
    <>
      {quizReady && quizData ? (
        <QuizGame quizData={quizData} />
      ) : (
        <QuizStart
          onQuizGenerated={handleQuizGenerated}
          onSetQuizReady={handleQuizReady}
        />
      )}
    </>
  );
}
