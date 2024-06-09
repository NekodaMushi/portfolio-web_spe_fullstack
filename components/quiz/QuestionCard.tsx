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

  // const getAnswerStyle = (answer: string) => {
  //   if (userAnswer === answer) {
  //     return userAnswer === correctAnswer
  //       ? "bg-green-500 text-white"
  //       : "bg-red-500 text-white";
  //   }
  //   if (userAnswer && answer === correctAnswer) {
  //     return "bg-green-500 text-white";
  //   }
  //   return "bg-white text-black";
  // };

  //DEV or until exam over

  const getAnswerStyle = (answer: string) => {
    if (userAnswer === answer) {
      return userAnswer === correctAnswer
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white";
    }
    if (answer === correctAnswer) {
      return "bg-blue-500 text-white";
    }
    return "bg-white text-black";
  };

  return (
    <div>
      <p className="max-w-[615px] text-center text-[20px] ">{question}</p>
      <div className="flex flex-col items-center pt-8">
        {answers ? (
          Object.entries(answers).map(([key, value]) => (
            <div
              key={key}
              onClick={() => onClick(key, currentQuestionIndex)}
              className={`border-grey my-2 flex min-h-[60px] w-full max-w-[600px] cursor-pointer select-none items-center justify-center rounded-[10px] border p-4 font-bold transition-transform duration-300 hover:scale-105 ${getAnswerStyle(
                key,
              )}`}
            >
              <span className="text-center">{value}</span>
            </div>
          ))
        ) : (
          <div>
            <p>⚠️ There was a issue with the quiz ⚠️</p>
            <p> Please generate a new quiz</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default QuestionCard;
