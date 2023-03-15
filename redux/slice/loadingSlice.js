import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
}

const loadingSlice = createSlice({
  name: 'displayLoading',
  initialState,
  reducers: {
    displayLoading: (state, action) => {
      state.isLoading = true
    },
    closeLoading: (state, action) => {
      state.isLoading = false
    },
  },
})

export const { displayLoading, closeLoading } = loadingSlice.actions

export default loadingSlice.reducer
