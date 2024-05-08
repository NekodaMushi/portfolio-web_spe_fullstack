
export type Question = {
  question: string;
  choices: Array<string>;
  correct_answer: string;
};

export type NumQuestions = "1" | "5" | "10" | "20" | "30" | "Select";

export type NumLength = {
    quizDataShort: "5",
    quizDataMedium: "10",
    quizDataLarge: "20",
    quizDataExam: "35",
    quizDataTest: "1",
};


export type QuestionsState = Array<Question>;

export type QuizCancelHandler = () => void;

export interface QuizLayoutProps {
  onSetQuizCancel: QuizCancelHandler;
}
