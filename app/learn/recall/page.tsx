"use client";

import LoadingQuiz from "@/components/LoadingQuiz";
import RecallQuizLayout from "@/components/recall/RecallQuizLayout";

import Recall from "@/components/recall/Recall";
import { useAppSelector } from "@/lib/redux/hooks";

export default function RecallOrQuiz() {
  const quizStart = useAppSelector((state) => state.recall.quizStart);

  return <>{quizStart ? <RecallQuizLayout /> : <Recall></Recall>}</>;
}
