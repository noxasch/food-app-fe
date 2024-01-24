import { configureStore } from '@reduxjs/toolkit'
import foodsReducer from './features/food'
import { useSelector } from 'react-redux'

export const makeStore = () => {
  return configureStore({
    reducer: {
      foodsReducer
    }
  })
}
