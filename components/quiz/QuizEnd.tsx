"use client";
import React, { useEffect } from "react";
import Bar from "./ui/bar";
import { Button } from "../ui/button";
import Image from "next/image";

import { useReward } from "react-rewards";
import Link from "next/link";

type Props = {
  score: number;
  totalQuestions: number;
  handleEnd: () => void;
};

const QuizEnd = ({ score, totalQuestions, handleEnd }: Props) => {
  const scorePercentage = (score / totalQuestions) * 100;
  const incorrectBar = 100 - scorePercentage;
  const correctAnswers = score;
  const incorrectAnswers = totalQuestions - score;

  const { reward } = useReward("rewardId", "confetti");

  useEffect(() => {
    if (scorePercentage >= 80) {
      reward();
    }
  }, [score, reward]);

  return (
    <div className="py-8  text-center sm:px-24 lg:px-36">
      <h2 className="mb-4 text-2xl font-bold">Quiz Completed</h2>
      <p className="mb-2 text-lg">Score: {scorePercentage.toFixed(2)}%</p>

      <Image
        src={
          scorePercentage > 75
            ? "/images/success/high.png"
            : scorePercentage > 50
              ? "/images/success/medium.png"
              : "/images/success/low.png"
        }
        alt="Success Image"
        width={250}
        height={250}
        className="rounded-sm"
      />
      <span id="rewardId" />
      <div className="my-6 flex justify-center space-x-4">
        <Bar
          percentage={scorePercentage}
          color="green"
          count={correctAnswers}
          label="Correct"
        />
        <Bar
          percentage={incorrectBar}
          color="red"
          count={incorrectAnswers}
          label="Incorrect"
        />
      </div>

      <Link href="/learn/recall" onClick={() => handleEnd()}>
        <Button>Finish</Button>
      </Link>
    </div>
  );
};

export default QuizEnd;
