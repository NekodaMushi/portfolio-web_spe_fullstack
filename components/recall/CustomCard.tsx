import React from "react";

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
  return (
    <div className="mx-auto my-2 max-w-2xl rounded-lg bg-black p-4 text-white sm:flex sm:h-64 sm:w-full sm:flex-col sm:items-center sm:justify-between">
      <div className="mb-4 flex flex-col sm:mb-0 sm:w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button className="-mt-6 rounded bg-gray-700 px-3 py-1 text-sm sm:mt-0">
            X
          </button>
        </div>
        <p className="text-sm">Length: {length}</p>
      </div>
      <div className="mb-4 sm:mb-0 sm:flex sm:w-full sm:items-center sm:justify-end">
        <div className="text-sm">
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
          <p className="text-sm">Last attempt: {lastAttempt} days ago</p>
          <p className="text-sm">Attempt Number: {attemptNumber}</p>
        </div>
        <div className="mt-4 flex gap-3">
          <button className=" w-full rounded bg-gray-700 px-3 py-1 text-sm sm:h-10 sm:w-auto">
            Change Length
          </button>
          <button className="w-full rounded bg-blue-500 px-3 py-1 text-sm sm:h-10 sm:w-auto">
            START
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
