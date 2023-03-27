import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userData: null,
  },
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action
      state.token = payload.token
      state.userData = payload.userData
    },
    logout: (state, action) => {
      state.token = null
      state.userData = null
    },    updateLoggedInUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload.newData }
    },
  },
})

export const { authenticate, updateLoggedInUserData, logout } =
  authSlice.actions

export default authSlice.reducer
