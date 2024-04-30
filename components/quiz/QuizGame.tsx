import generatedQuiz from "@/quiz.json"; // Ensure this path correctly points to your JSON file
// import { Button } from "../ui/button";

import QuizCard from "./QuizCard";
import { Card, CardContent } from "../ui/card";

//

// import { useRouter } from "next/router";
// useRouter;

const QuizGame = () => {
  const questions = generatedQuiz; // Assuming generatedQuiz has a 'questions' property
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
