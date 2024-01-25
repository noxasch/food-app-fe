import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const foodsSlice = createSlice({
  name: 'foods',
  initialState: initialState,
  reducers: {
    append: (state, action) => {
      return [...state, action.payload]
    },
    remove: (state, action) => {
      const id = action.payload
      const res = state.filter((item) => item.id !== id)
      return res
    },
    update: (state, action) => {
      const id = action.payload.id
      const idx = state.findIndex(o => o.id == id)
      const res = [...state]
      res[idx] = action.payload
      return res
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

export const { append, reset, set, update, remove } = foodsSlice.actions

export default foodsSlice.reducer
