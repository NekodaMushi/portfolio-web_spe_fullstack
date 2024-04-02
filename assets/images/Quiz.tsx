"use client";
import Image from "next/image";

const QUIZ = () => {
  return (
    <div>
      <span>
        <Image
          className="h-10 w-10"
          src="/images/logos/quiz.png"
          alt="QUIZ"
          width={64}
          height={64}
          unoptimized={true}
        />
      </span>
    </div>
  );
};

export default QUIZ;
