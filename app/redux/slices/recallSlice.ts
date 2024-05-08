// recallSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NumQuestions, QuestionsState } from "@/types/quiz";

interface RecallState {
  videoId: string;
  quizId: string;
  quizData: {
    [key in NumQuestions]?: QuestionsState;
  };
  selectedQuizData: QuestionsState | null;
  quizStart: boolean;
}

const initialState: RecallState = {
  videoId: '',
  quizId: '',
  quizData: {},
  selectedQuizData: null,
  quizStart: false,
};

const recallSlice = createSlice({
  name: 'recall',
  initialState,
  reducers: {
    setRecallData: (state, action: PayloadAction<{ videoId: string; quizId: string; quizData: { [key in NumQuestions]?: QuestionsState } }>) => {
      const { videoId, quizId, quizData } = action.payload;
      state.videoId = videoId;
      state.quizId = quizId;
      state.quizData = quizData;
    },
    setSelectedQuizData: (state, action: PayloadAction<NumQuestions>) => {
      const numQuestions = action.payload;
      state.selectedQuizData = state.quizData[numQuestions] || null;
    },
    setQuizStart: (state, action: PayloadAction<boolean>) => {
      state.quizStart = action.payload;
    },
    resetRecall: (state) => {
      state.videoId = '';
      state.quizData = {};
      state.selectedQuizData = null;
      state.quizStart = false;
    },
  },
});

export const { setRecallData, setSelectedQuizData, resetRecall, setQuizStart } = recallSlice.actions;

export default recallSlice.reducer;
