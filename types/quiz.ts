
export type Question = {
  question: string;
  choices: Array<string>;
  correct_answer: string;
};

export type QuestionsState = Array<Question>;

