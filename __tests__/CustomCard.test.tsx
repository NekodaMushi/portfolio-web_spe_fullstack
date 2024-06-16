import React from "react";
import { render, screen } from "@testing-library/react";
import CustomCard from "@/components/recall/client/CustomCard"; // Ensure this path is correct

describe("CustomCard", () => {
  const defaultProps = {
    quizTitle: "Test Quiz Title",
    length: 10,
    lastScore: 7,
    highestScore: 9,
    highestScoreTotal: 10,
    lastAttempt: "2023-06-15T12:00:00Z",
    attemptNumber: 3,
    successRate: 70,
  };

  it("renders the quiz title", () => {
    render(<CustomCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.quizTitle)).toBeTruthy();
  });

  it("renders the success rate", () => {
    render(<CustomCard {...defaultProps} />);
    expect(screen.getByText(`${defaultProps.successRate}%`)).toBeTruthy();
  });

  it("renders the attempt number", () => {
    render(<CustomCard {...defaultProps} />);
    expect(
      screen.getByText(`Attempt #${defaultProps.attemptNumber}`),
    ).toBeTruthy();
  });

  it("renders the total questions", () => {
    render(<CustomCard {...defaultProps} />);
    expect(
      screen.getByText(`Total Questions: ${defaultProps.length}`),
    ).toBeTruthy();
  });

  it("renders the incorrect answers", () => {
    const incorrectAnswers = defaultProps.length - defaultProps.lastScore;
    render(<CustomCard {...defaultProps} />);
    expect(
      screen.getByText(`Incorrect Answers: ${incorrectAnswers}`),
    ).toBeTruthy();
  });

  it("renders the highest score", () => {
    render(<CustomCard {...defaultProps} />);
    expect(
      screen.getByText(
        `Highest Score: ${defaultProps.highestScore}/${defaultProps.highestScoreTotal}`,
      ),
    ).toBeTruthy();
  });

  it("renders the updated date", () => {
    render(<CustomCard {...defaultProps} />);
    expect(
      screen.getByText(
        `Updated: ${new Date(defaultProps.lastAttempt).toLocaleString()}`,
      ),
    ).toBeTruthy();
  });
});
