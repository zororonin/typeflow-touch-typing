import { createSlice } from '@reduxjs/toolkit'

const typingSlice = createSlice({
  name: 'typing',
  initialState: {
    duration: 60, // seconds
    lastResult: null,
  },
  reducers: {
    setDuration(state, action) {
      state.duration = action.payload
    },
    setResult(state, action) {
      state.lastResult = action.payload
    },
  },
})

export const { setDuration, setResult } = typingSlice.actions
export default typingSlice.reducer