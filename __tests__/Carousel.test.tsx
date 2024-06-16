import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Carousel } from "@/components/recall/client/Carousel";
import fetchMock from "jest-fetch-mock";

describe("Carousel component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("renders loading spinner initially", () => {
    render(<Carousel />);
    expect(screen.getByRole("status")).toBeTruthy();
  });

  it("toggles to review quizzes", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        learningAndTransitionPhaseQuizzes: [
          {
            successRate: 80,
            attemptNumber: 1,
            totalQuestions: 10,
            incorrectAnswers: 2,
            highestScore: 8,
            highestScoreTotal: 10,
            updatedAt: "2023-06-15T12:00:00Z",
            videoId: "video1",
          },
        ],
        reviewPhaseQuizzes: [
          {
            successRate: 90,
            attemptNumber: 2,
            totalQuestions: 10,
            incorrectAnswers: 1,
            highestScore: 9,
            highestScoreTotal: 10,
            updatedAt: "2023-06-15T12:00:00Z",
            videoId: "video2",
          },
        ],
      }),
    );

    render(<Carousel />);

    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());

    expect(screen.getByText("video1")).toBeTruthy();

    fireEvent.click(screen.getByText("Review"));

    expect(screen.getByText("video2")).toBeTruthy();
  });

  it("handles empty data", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        learningAndTransitionPhaseQuizzes: [],
        reviewPhaseQuizzes: [],
      }),
    );

    render(<Carousel />);

    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());

    expect(
      screen.getByText(
        "No need to learn or review today, Please generate new quiz!",
      ),
    ).toBeTruthy();
  });
});
