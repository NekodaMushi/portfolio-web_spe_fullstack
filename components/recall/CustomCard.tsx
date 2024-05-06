import React, { useState } from "react";
import { Button } from "../ui/button";
import { SelectNumber } from "../quiz/ui/selectNumber";
import { NumQuestions } from "@/types/quiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

interface CardProps {
  title: string;
  length: number;
  lastScore: number;
  highestScore: number;
  lastAttempt: string;
  attemptNumber: number;
}

const CustomCard: React.FC<CardProps> = ({
  title,
  length,
  lastScore,
  highestScore,
  lastAttempt,
  attemptNumber,
}) => {
  const CustomColor =
    lastScore / length >= 0.5
      ? `border-[2px] border-green-500`
      : `border-[2px] border-red-500`;

  const [numQuestions, setNumQuestions] = useState<NumQuestions>("Select");

  const handleSelectNumber = (value: NumQuestions) => {};

  return (
    <div
      className={`relative z-10 my-2 rounded-lg border-2 p-4 shadow-lg sm:flex sm:h-64 sm:w-full sm:max-w-2xl sm:flex-col sm:items-center sm:justify-between lg:h-80 lg:max-w-5xl ${CustomColor}`}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 z-[-1] rounded-lg ${CustomColor} blur-lg filter`}
      ></div>

      <div className="mb-4 flex flex-col sm:mb-0 sm:w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            className={`${CustomColor} -mt-6 rounded px-3 py-1 text-sm sm:mt-0`}
          >
            <FontAwesomeIcon icon={faRotateRight} />
            {/* <FontAwesomeIcon icon={faRotateRight} spin /> */}
          </button>
        </div>
        <p className="text-base">Length: {length}</p>
      </div>
      <div className="mb-4 sm:mb-0 sm:flex sm:w-full sm:items-center sm:justify-end">
        <div className="text-sm ">
          <p>
            Last Score: {lastScore}/{length}
          </p>
          <p>
            Highest Score: {highestScore}/{length}
          </p>
        </div>
      </div>
      <div className="mb-4 sm:mb-0 sm:flex sm:w-full sm:items-end sm:justify-between">
        <div>
          <p className="text-sm">Last attempt: {lastAttempt}</p>
          <p className="text-sm">Attempt Number: {attemptNumber}</p>
        </div>
        <div className="mt-4 flex gap-3">
          <SelectNumber
            value={numQuestions}
            onValueChange={handleSelectNumber}
          />
          <Button className="w-full rounded  px-3 py-1 text-sm sm:h-9 sm:w-auto">
            START
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
