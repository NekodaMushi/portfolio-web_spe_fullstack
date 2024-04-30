type Props = {
  text: string;
  onClick: () => void;
};

const QuizButton = ({ text, onClick }: Props) => {
  return (
    <button
      className="h-[45px] min-w-[120px] select-none rounded-[10px] bg-[rgb(80,172,128)] font-bold opacity-100 transition-opacity duration-300 hover:opacity-75"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default QuizButton;
