import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SelectNumber } from "./ui/selectNumber";
// import { Toaster, toast } from 'sonner'
import { useAppDispatch, useAppSelector } from "hooks";
import { setQuizData, setQuizSelected } from "slices/quizSlice";
import { NumQuestions } from "@/types/quiz";
type Props = {
  onSetQuizReady: () => void;
};

export function QuizStart({ onSetQuizReady }: Props) {
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

  const [numQuestions, setNumQuestions] = useState<NumQuestions>("Select");
  const [animationDuration, setAnimationDuration] = useState<number>(750);
  const [generated, setGenerated] = useState<boolean>(false);

  const [quizReady, setQuizReady] = useState<{
    [key in NumQuestions]?: boolean;
  }>({});

  const dispatch = useAppDispatch();
  const { videoId, quizData } = useAppSelector((state) => state.quiz);

  // NOW START
  useEffect(() => {
    const checkQuizReady = () => {
      const updatedQuizReady = { ...quizReady };
      Object.keys(quizData).forEach((length) => {
        updatedQuizReady[length as NumQuestions] = true;
      });
      setQuizReady(updatedQuizReady);
    };

    checkQuizReady();
  }, [quizData]);
  //

  const handleSelectNumber = (value: NumQuestions) => {
    setNumQuestions(value);
    updateAnimationDuration(value);
    dispatch(setQuizSelected(value));

    // Check if the selected numQuestions exists in quizData
    setQuizReady((prevState) => ({
      ...prevState,
      [value]: quizData[value] !== undefined,
    }));
  };

  useEffect(() => {
    const fetchQuizReady = async () => {
      try {
        const response = await fetch("/api/ai/quiz/ready");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const quizData = await response.json();
        setQuizReady(quizData.quizReady);
      } catch (error) {
        console.error("Error fetching quiz ready state:", error);
      }
    };

    fetchQuizReady();
  }, []);

  const handleGenerateClick = async () => {
    // Remove the possibility to re generate quiz
    // if (quizData[numQuestions]) {
    //   dispatch(setQuizSelected(numQuestions));
    //   setQuizReady((prevState) => ({
    //     ...prevState,
    //     [numQuestions]: true,
    //   }));
    //   return;
    // }

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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const videoId = data.videoId;
      const quizData = JSON.parse(data.quizData);

      dispatch(setQuizData({ videoId, numQuestions, quizData }));
      dispatch(setQuizSelected(numQuestions));

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
    "30": 11000,
    Select: 0, // Component doesn't allow to initially display something without value
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
        <SelectNumber value={numQuestions} onValueChange={handleSelectNumber} />
        <button
          disabled={numQuestions === "Select"}
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
