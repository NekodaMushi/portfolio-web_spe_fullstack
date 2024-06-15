import QuizCard from "./QuizCard";
import { Card } from "../ui/card";
import { useAppSelector } from "hooks";

import { QuizLayoutProps } from "@/types/quiz";
import { useState } from "react";

const QuizLayout = ({ onSetQuizCancel }: QuizLayoutProps) => {
  const quizSelected = useAppSelector((state) => state.quiz.quizSelected);
  const quizId = useAppSelector((state) => state.quiz.quizId);
  const videoId = useAppSelector((state) => state.quiz.videoId);

  const questions = quizSelected;
  const totalQuestions = questions.length;

  // Temp FIX
  const [preventNaN, setPreventNaN] = useState<boolean>(true);

  const handleSetPreventNaN = (value: boolean) => {
    setPreventNaN(value);
  };
  return (
    <div className="m-auto flex w-full flex-col items-center">
      {preventNaN && (
        <Card className="p-8">
          <QuizCard
            questions={questions}
            totalQuestions={totalQuestions}
            quizId={quizId}
            videoId={videoId}
            onSetQuizCancel={onSetQuizCancel}
            onSetPreventNaN={handleSetPreventNaN}
          />
        </Card>
      )}
    </div>
  );
};

export default QuizLayout;
