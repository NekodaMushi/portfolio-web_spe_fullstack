import React from "react";
import CustomCard from "./CustomCard";

function TempFixFront() {
  return (
    <div>
      <div className="pt-32"></div>
      <CustomCard
        key={1}
        quizTitle="3070. Reusing Styles With React Components"
        length={20}
        lastScore={4}
        highestScore={14}
        highestScoreTotal={20}
        lastAttempt="2"
        attemptNumber={6}
      />
      <CustomCard
        key={2}
        quizTitle="3070. Reusing Styles With React Components"
        length={20}
        lastScore={4}
        highestScore={14}
        highestScoreTotal={20}
        lastAttempt="2"
        attemptNumber={6}
      />
      <CustomCard
        key={3}
        quizTitle="3070. Reusing Styles With React Components"
        length={20}
        lastScore={4}
        highestScore={14}
        highestScoreTotal={20}
        lastAttempt="2"
        attemptNumber={6}
      />
    </div>
  );
}

export default TempFixFront;
