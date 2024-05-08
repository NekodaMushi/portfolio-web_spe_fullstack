import { configureStore } from '@reduxjs/toolkit'

import quizReducer from 'slices/quizSlice'
import recallReducer from 'slices/recallSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      quiz: quizReducer,
      recall: recallReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
