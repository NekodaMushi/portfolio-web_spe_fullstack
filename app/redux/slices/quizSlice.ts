import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NumQuestions } from "@/types/quiz";

interface QuizState {
  videoId: string;
  quizId: string;
  quizData: {
    [key in NumQuestions]?: any[];
  };
  quizSelected: any[];
  
}

const initialState: QuizState = {
  videoId: '',
  quizId: '',
  quizData: {},
  quizSelected: [],
  
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizData: (state, action: PayloadAction<{ videoId: string; quizId: string; numQuestions: NumQuestions; quizData: any[] }>) => {
      const { videoId, quizId, numQuestions, quizData } = action.payload;
      if (videoId !== state.videoId) {
        // Reset 
        state.videoId = videoId;
        state.quizId = quizId;
        state.quizData = {
          [numQuestions]: quizData,
        };
        state.quizSelected = quizData;
      } else {
        // Update
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
