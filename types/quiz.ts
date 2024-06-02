
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
    quizDataExam: "30",
    quizDataTest: "1",
};


export type QuestionsState = Array<Question>;

export type QuizCancelHandler = () => void;

export interface QuizLayoutProps {
  onSetQuizCancel: QuizCancelHandler;
}



export interface CarouselDataItem {
  successRate: number;
  attemptNumber: number;
  totalQuestions: number;
  incorrectAnswers: number;
  highestScore: number;
  highestScoreTotal: number;
  updatedAt: string;
  videoId: string;
}

export type CarouselData = CarouselDataItem[];
