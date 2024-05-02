
export type Question = {
  question: string;
  choices: Array<string>;
  correct_answer: string;
};

export type NumQuestions = "2" | "5" | "10" | "20" | "30" | "Select";

export type QuestionsState = Array<Question>;

