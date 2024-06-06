type Props = {
  currentQuestionIndex: number;
  question: string;
  answers: Array<string> | undefined;
  userAnswer: string | undefined;
  correctAnswer: string;
  onClick: (answer: string, currentQuestionIndex: number) => void;
};

const QuestionCard = ({
  currentQuestionIndex,
  question,
  answers,
  userAnswer,
  onClick,
  correctAnswer,
}: Props) => {
  // PROD

  const getAnswerStyle = (answer: string) => {
    if (userAnswer === answer) {
      return userAnswer === correctAnswer
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white";
    }
    if (userAnswer && answer === correctAnswer) {
      return "bg-green-500 text-white";
    }
    return "bg-white text-black";
  };

  //DEV

  // const getAnswerStyle = (answer: string) => {
  //   if (userAnswer === answer) {
  //     return userAnswer === correctAnswer
  //       ? "bg-green-500 text-white"
  //       : "bg-red-500 text-white";
  //   }
  //   if (answer === correctAnswer) {
  //     return "bg-blue-500 text-white";
  //   }
  //   return "bg-white text-black";
  // };

  return (
    <div>
      <p className="text-[20px]text-center max-w-[615px] ">{question}</p>
      <div className="flex flex-col items-center pt-8">
        {answers?.map((answer) => (
          <div
            key={answer}
            onClick={() => onClick(answer, currentQuestionIndex)}
            className={` border-grey my-2 flex min-h-[60px] w-full max-w-[600px] cursor-pointer select-none items-center justify-center rounded-[10px] border p-4 font-bold transition-transform duration-300 hover:scale-105  ${getAnswerStyle(
              answer,
            )}`}
          >
            <span className="text-center ">{answer}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
