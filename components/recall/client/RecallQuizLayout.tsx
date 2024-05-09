"use client";
import RecallQuizCard from "./RecallQuizCard";
import { Card } from "../../ui/card";
import { useAppSelector } from "hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import { resetRecall } from "slices/recallSlice";

import { QuizLayoutProps } from "@/types/quiz";
import { useEffect } from "react";

const RecallQuizLayout = () => {
  const selectedQuizData = useAppSelector(
    (state) => state.recall.selectedQuizData,
  );
  const videoId = useAppSelector((state) => state.recall.videoId);
  const quizId = useAppSelector((state) => state.recall.quizId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedQuizData) {
      const timer = setTimeout(() => {
        dispatch(resetRecall());
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [selectedQuizData]);

  if (!selectedQuizData) {
    return (
      <div className="m-auto flex w-full flex-col items-center">
        No quiz data available: Reloading ...
      </div>
    );
  }

  const questions = selectedQuizData;
  const totalQuestions = questions.length;

  // TO CLEAN LATER - TO REMOVE LATER
  console.log(questions);
  console.log(totalQuestions);

  return (
    <div className="m-auto flex w-full flex-col items-center">
      <Card className="p-8">
        <RecallQuizCard
          questions={questions}
          totalQuestions={totalQuestions}
          quizId={quizId}
          videoId={videoId}
        />
      </Card>
    </div>
  );
};

export default RecallQuizLayout;
