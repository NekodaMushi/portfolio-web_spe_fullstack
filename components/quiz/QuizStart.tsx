import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SelectNumber } from "./ui/selectNumber";
// import { Toaster, toast } from 'sonner'

type Props = {
  onQuizGenerated: (data: any) => void;
  onSetQuizReady: () => void;
};

type NumQuestions = "2" | "5" | "10" | "20" | "30";

export function QuizStart({ onQuizGenerated, onSetQuizReady }: Props) {
  const loadingStates = [
    {
      text: "Check if quiz already exist in DB",
    },
    {
      text: "Fetch Last Transcript",
    },
    {
      text: "Sending to transcript to AI",
    },
    {
      text: "Receiving AI response",
    },
    {
      text: "Quiz is ready & stored in DB",
    },
    {
      text: "Enjoy...",
    },
  ];

  const words = [
    {
      text: "Start",
    },
    {
      text: "your",
    },
    {
      text: "quiz",
    },
    {
      text: "using",
    },
    {
      text: "NexLearn.",
      className: "text-primary dark:text-primary",
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);

  const [numQuestions, setNumQuestions] = useState<NumQuestions>("5");
  const [animationDuration, setAnimationDuration] = useState<number>(750);
  const [generated, setGenerated] = useState<boolean>(false);

  const [quizReady, setQuizReady] = useState<{
    [key in NumQuestions]?: boolean;
  }>({});

  // NOW START
  //

  useEffect(() => {
    const fetchQuizReady = async () => {
      try {
        const response = await fetch("/api/ai/quiz/ready");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuizReady(data.quizReady);
      } catch (error) {
        console.error("Error fetching quiz ready state:", error);
      }
    };

    fetchQuizReady();
  }, []);

  const handleGenerateClick = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/ai/quiz/generating?numQuestions=${numQuestions}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("BEFORE");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("111111111111");
      const data = await response.json();
      console.log("22222222222222");

      onQuizGenerated(data);
      setLoading(false);
      setQuizReady((prevState) => ({
        ...prevState,
        [numQuestions]: true,
      }));
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleStartClick = () => {
    onSetQuizReady();
  };

  const updateAnimationDuration = (numQuestions: NumQuestions) => {
    setAnimationDuration(durationMap[numQuestions]);
    console.log(animationDuration);
  };

  const durationMap: { [key in NumQuestions]: number } = {
    "2": 1000, // 750ms for 2 questions
    "5": 2000, // Good
    "10": 4000, // Perfect
    "20": 7000, // Good
    "30": 10000, //
  };

  return (
    <div className="flex h-[30rem] flex-col items-center justify-center">
      <Loader
        loadingStates={loadingStates}
        loading={loading}
        duration={animationDuration}
      />
      <p className="text-xs text-neutral-600 dark:text-neutral-200 sm:text-base">
        Once you used the chrome extension
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col gap-4 space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <SelectNumber
          value={numQuestions}
          onValueChange={(value: NumQuestions) => {
            setNumQuestions(value);
            updateAnimationDuration(value);
          }}
        />
        <button
          className="animate-shimmer inline-flex w-48 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 py-2 font-medium text-slate-400 transition-colors hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          onClick={handleGenerateClick}
          onMouseEnter={() => setGenerated(true)}
          onMouseLeave={() => setGenerated(false)}
        >
          <span className="inline-block w-full text-center">
            {quizReady[numQuestions]
              ? generated
                ? "Generate again"
                : "Generated"
              : "Generate"}
          </span>
        </button>
        {quizReady[numQuestions] ? (
          <Button className="w-48 py-2" onClick={handleStartClick}>
            <span className="inline-block w-full text-center">Start</span>
          </Button>
        ) : (
          <Button className="w-48 py-2" disabled>
            <span className="inline-block w-full text-center">
              <ReloadIcon className="mr-2 inline-block h-4 w-4 animate-spin" />
              Please Generate
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}
