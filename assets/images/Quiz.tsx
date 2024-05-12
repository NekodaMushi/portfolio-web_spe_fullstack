"use client";
import Image from "next/image";
import React from "react";

interface QuizProps {
  width?: number;
  height?: number;
}

const Quiz: React.FC<QuizProps> = ({ width = 64, height = 64 }) => {
  return (
    <div>
      <span>
        <Image
          src="/images/logos/quiz.png"
          alt="QUIZ"
          width={width}
          height={height}
          unoptimized={true}
          priority
        />
      </span>
    </div>
  );
};

export default Quiz;
