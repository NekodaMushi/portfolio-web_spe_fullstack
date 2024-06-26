"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SelectNumber } from "./ui/selectNumber";
import { Toaster, toast } from "sonner";
import { useAppDispatch, useAppSelector } from "hooks";
import { setQuizData, setQuizSelected } from "slices/quizSlice";
import { NumQuestions } from "@/types/quiz";

import {
  loadingStates,
  words,
  dynamicTitle,
  dynamicTitleForSmallDevice,
  updateAnimationDuration,
} from "./ui/animationConfigQuizStart";

type Props = {
  onSetQuizReady: () => void;
};

export function QuizStart({ onSetQuizReady }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const [numQuestions, setNumQuestions] = useState<NumQuestions>("Select");
  const [animationDuration, setAnimationDuration] = useState<number>(750);
  const [generated, setGenerated] = useState<boolean>(false);
  const [displayTitle, setdisplayTitle] = useState<boolean>(false);

  const [quizReady, setQuizReady] = useState<{
    [key in NumQuestions]?: boolean;
  }>({});

  const dispatch = useAppDispatch();
  const { quizData, videoId } = useAppSelector((state) => state.quiz);

  useEffect(() => {
    const checkQuizReady = () => {
      const updatedQuizReady = { ...quizReady };
      Object.keys(quizData).forEach((length) => {
        updatedQuizReady[length as NumQuestions] = true;
      });
      setQuizReady(updatedQuizReady);
    };

    checkQuizReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizData]);

  const handleSelectNumber = (value: NumQuestions) => {
    setNumQuestions(value);
    updateAnimationDuration(value, setAnimationDuration);
    dispatch(setQuizSelected(value));

    // Check if the selected numQuestions exists in quizData
    setQuizReady((prevState) => ({
      ...prevState,
      [value]: quizData[value] !== undefined,
    }));
    setdisplayTitle(true);
  };

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
        `/api/ai/quiz/generate?numQuestions=${numQuestions}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const quizId = data.quizId;
      const videoId = data.videoId;
      const quizData = JSON.parse(data.quizData);

      // console.log(quizId);

      dispatch(setQuizData({ videoId, numQuestions, quizData, quizId }));
      dispatch(setQuizSelected(numQuestions));

      setQuizReady((prevState) => ({
        ...prevState,
        [numQuestions]: true,
      }));
      setdisplayTitle(true);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);

      if (error instanceof TypeError && error.message.includes("Network")) {
        toast.error("Network error: Please check your connection.");
      } else if (
        error instanceof SyntaxError &&
        error.message.includes("JSON")
      ) {
        // Note for later in this condition:
        // Implement a new API request :
        // to fetch a new quiz from the AI.
        toast.info("Please try another length.");
        // toast.error("AI error: Received malformed data.");
      } else {
        console.log(error);
        toast.info("You need to download a transcript first");
      }
    }
    setLoading(false);
  };

  const handleStartClick = () => {
    onSetQuizReady();
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
      {displayTitle && videoId ? (
        <>
          <div className="hidden sm:block">
            <TypewriterEffectSmooth words={dynamicTitle(videoId)} />
          </div>
          <div className="block sm:hidden">
            <TypewriterEffectSmooth
              words={dynamicTitleForSmallDevice(videoId)}
            />
          </div>
        </>
      ) : (
        <TypewriterEffectSmooth words={words} />
      )}

      <div className="flex flex-col  space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <SelectNumber value={numQuestions} onValueChange={handleSelectNumber} />
        <button
          disabled={numQuestions === "Select"}
          className="animate-shimmer inline-flex w-52 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 py-2 font-medium text-slate-400 transition-colors hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
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
          <Button className="w-52 py-2" onClick={handleStartClick}>
            <span className="inline-block w-full text-center">Start</span>
          </Button>
        ) : (
          <Button className="w-52 py-2" disabled>
            <span className="inline-block w-full text-center">
              <ReloadIcon className="mr-2 inline-block h-4 w-4 animate-spin" />
              Please Generate
            </span>
          </Button>
        )}
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}
