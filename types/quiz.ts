
export type Question = {
  question: string;
  choices: Array<string>;
  correct_answer: string;
};

export type NumQuestions = "1" | "5" | "10" | "20" | "30" | "Select";

export type NumLength = "dataQuizTest" | "dataQuizShort"| "QuizDataMedium" | "QuizDataLarge" | "QuizDataExam" | "Select"

export type QuestionsState = Array<Question>;

export type QuizCancelHandler = () => void;

export interface QuizLayoutProps {
  onSetQuizCancel: QuizCancelHandler;
}
