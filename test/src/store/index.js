import { configureStore } from '@reduxjs/toolkit'
import storeReducer from './storySlice'
 
export const store = configureStore({
  reducer: {
    storySlice: storeReducer
  },
})