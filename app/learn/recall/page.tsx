"use client";

import LoadingQuiz from "@/components/LoadingQuiz";
import RecallQuizLayout from "@/components/recall/RecallQuizLayout";
import { QuizStart } from "@/components/quiz/QuizStart";
import { useState, useEffect } from "react";

import { QuestionsState } from "@/types/quiz";
import Recall from "@/components/recall/Recall";
import { useAppSelector } from "@/lib/redux/hooks";

export default function RecallOrQuiz() {
  const [quizReady, setQuizReady] = useState<boolean>(false);
  const quizStart = useAppSelector((state) => state.recall.quizStart);

  useEffect(() => {
    if (quizStart) {
      setQuizReady(true);
    }
  }, [quizStart]);

  const handleQuizCancel = () => {
    setQuizReady(false);
  };

  return (
    <>
      {quizReady ? (
        <RecallQuizLayout onSetQuizCancel={handleQuizCancel} />
      ) : (
        <Recall></Recall>
      )}
    </>
  );
}
