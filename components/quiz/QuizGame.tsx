import QuizCard from "./QuizCard";
import { Card } from "../ui/card";
import { QuestionsState } from "@/types/quiz";

type Props = {
  quizData: QuestionsState;
};

const QuizGame: React.FC<Props> = ({ quizData }) => {
  const questions = quizData;
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
