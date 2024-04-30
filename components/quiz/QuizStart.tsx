import { useState } from "react";
import { Button } from "../ui/button";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { ReloadIcon } from "@radix-ui/react-icons";
type Props = {
  onQuizGenerated: (data: any) => void;
  onSetQuizReady: () => void;
};

export function QuizStart({ onQuizGenerated, onSetQuizReady }: Props) {
  let loadingStates = [
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
  const [quizReady, setQuizReady] = useState<boolean>(false);

  const handleGenerateClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai/quiz/generating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      onQuizGenerated(data);
      setLoading(false);
      setQuizReady(true);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleStartClick = () => {
    onSetQuizReady();
  };

  return (
    <div className="flex h-[30rem] flex-col items-center justify-center  ">
      <Loader loadingStates={loadingStates} loading={loading} duration={750} />
      <p className="text-xs text-neutral-600 dark:text-neutral-200 sm:text-base  ">
        Once you used the chrome extension
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <button
          className="animate-shimmer inline-flex items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          onClick={handleGenerateClick}
        >
          {quizReady ? "Generated" : "Generate"}
        </button>
        {quizReady ? (
          <Button onClick={handleStartClick}>Start</Button>
        ) : (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please Generate
          </Button>
        )}
      </div>
    </div>
  );
}
