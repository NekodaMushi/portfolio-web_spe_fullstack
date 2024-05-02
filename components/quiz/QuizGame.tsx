import QuizCard from "./QuizCard";
import { Card } from "../ui/card";
import { useAppSelector } from "hooks";

const QuizGame = () => {
  const quizSelected = useAppSelector((state) => state.quiz.quizSelected);

  const questions = quizSelected;
  const totalQuestions = questions.length;
  return (
    <div className="m-auto flex w-full flex-col items-center">
      <Card className="p-8">
        <QuizCard questions={questions} totalQuestions={totalQuestions} />
      </Card>
    </div>
  );
};

export default QuizGame;
