import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const foodsSlice = createSlice({
  name: 'foods',
  initialState: initialState,
  reducers: {
    append: (state, action) => {
      return state.push(action.payload.foods)
    },
    reset: (state, action) => {
      return initialState;
    },
    set: (state, action) => {
      return action.payload.foods
    },
    default: (state, action) => state
  }
})

export const { append, reset, set } = foodsSlice.actions

export default foodsSlice.reducer
