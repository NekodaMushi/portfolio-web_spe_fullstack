import React from "react";
import CustomCard from "./CustomCard";

function TempFixFront() {
  return (
    <>
      <CustomCard
        key={4}
        quizTitle="3070. Reusing Styles With React Components"
        length={20}
        lastScore={4}
        highestScore={14}
        highestScoreTotal={20}
        lastAttempt="2"
        attemptNumber={6}
      />

      <CustomCard
        key={5}
        quizTitle="3070. Reusing Styles With React Components"
        length={20}
        lastScore={4}
        highestScore={14}
        highestScoreTotal={20}
        lastAttempt="2"
        attemptNumber={6}
      />

      <CustomCard
        key={6}
        quizTitle="3070. Reusing Styles With React Components"
        length={20}
        lastScore={4}
        highestScore={14}
        highestScoreTotal={20}
        lastAttempt="2"
        attemptNumber={6}
      />
    </>
  );
}

export default TempFixFront;
