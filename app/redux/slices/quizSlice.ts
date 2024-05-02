import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NumQuestions } from "@/types/quiz";

interface QuizState {
  videoId: string;
  quizData: {
    [key in NumQuestions]?: any[];
  };
  quizSelected: any[];
}

const initialState: QuizState = {
  videoId: '',
  quizData: {},
  quizSelected: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizData: (state, action: PayloadAction<{ videoId: string; numQuestions: NumQuestions; quizData: any[] }>) => {
      const { videoId, numQuestions, quizData } = action.payload;
      if (videoId !== state.videoId) {
        // Reset the entire quizData object and quizSelected array
        state.videoId = videoId;
        state.quizData = {
          [numQuestions]: quizData,
        };
        state.quizSelected = quizData;
      } else {
        // Update the quizData for the specific numQuestions
        state.quizData[numQuestions] = quizData;
        state.quizSelected = quizData;
      }
    },
    setQuizSelected: (state, action: PayloadAction<NumQuestions>) => {
      const numQuestions = action.payload;
      state.quizSelected = state.quizData[numQuestions] || [];
    },
  },
});

export const { setQuizData, setQuizSelected } = quizSlice.actions;

export default quizSlice.reducer;
