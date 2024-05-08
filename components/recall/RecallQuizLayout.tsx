import RecallQuizCard from "./RecallQuizCard";
import { Card } from "../ui/card";
import { useAppSelector } from "hooks";

import { QuizLayoutProps } from "@/types/quiz";

const RecallQuizLayout = ({ onSetQuizCancel }: QuizLayoutProps) => {
  const selectedQuizData = useAppSelector(
    (state) => state.recall.selectedQuizData,
  );
  const videoId = useAppSelector((state) => state.recall.videoId);
  const quizId = useAppSelector((state) => state.recall.quizId);
  // const quiz = useAppSelector((state) => state.recall.quizData);

  console.log("-------------0");
  // console.log(quiz?.quizDataShort);
  console.log(videoId);
  console.log(quizId);
  console.log(selectedQuizData);

  if (!selectedQuizData) {
    return (
      <div className="m-auto flex w-full flex-col items-center">
        No quiz data available
      </div>
    );
  }

  const questions = selectedQuizData;
  console.log(questions);
  const totalQuestions = questions.length;
  console.log(totalQuestions);

  return (
    <div className="m-auto flex w-full flex-col items-center">
      <Card className="p-8">
        <RecallQuizCard
          questions={questions}
          totalQuestions={totalQuestions}
          quizId={quizId}
          videoId={videoId}
          onSetQuizCancel={onSetQuizCancel}
        />
      </Card>
    </div>
  );
};

export default RecallQuizLayout;
