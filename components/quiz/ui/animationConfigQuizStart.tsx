import { NumQuestions } from "@/types/quiz";

// Loading Animation ---------
export const loadingStates = [
  {
    text: "Check if quiz already exist in DB",
  },
  {
    text: "Fetch Last Transcript",
  },
  {
    text: "Sending transcript to AI",
  },
  {
    text: "Receiving AI response",
  },
  {
    text: "Quiz is ready & stored in DB",
  },
  {
    text: "Enjoy...",
  },
];

export const durationMap: { [key in NumQuestions]: number } = {
  "1": 1000, // 750ms for 2 questions
  "5": 2000, // Good
  "10": 4000, // Perfect
  "20": 9000, // Good
  "30": 12000,
  Select: 0, // Component doesn't allow to display something without value
};

export const updateAnimationDuration = (
  numQuestions: NumQuestions,
  setAnimationDuration: (duration: number) => void,
) => {
  setAnimationDuration(durationMap[numQuestions]);
};

// Title Animation ----------

export const words = [
  {
    text: "Start",
  },
  {
    text: "your",
  },
  {
    text: "quiz",
  },
  {
    text: "using",
  },
  {
    text: "NexLearn.",
    className: "text-primary dark:text-primary",
  },
];

export const dynamicTitle = (videoId: string) => [
  {
    text: "Quiz",
    className: "text-primary dark:text-primary",
  },
  {
    text: "Title:",
    className: "text-primary dark:text-primary",
  },
  {
    text: videoId,
  },
];

export const dynamicTitleForSmallDevice = (videoId: string) => [
  {
    text: videoId,
  },
];
