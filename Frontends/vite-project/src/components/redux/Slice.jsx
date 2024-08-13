import { createSlice } from '@reduxjs/toolkit';

// User slice
const Slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    status: null,
    error: null,
  },
  reducers: {
    signupUser: (state) => {
      state.status = 'loading';
    },
    loginUser: (state) => {
      state.status = 'loading';
    },
    signupUserSuccess: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    signupUserFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    loginUserSuccess: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginUserFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  signupUser,
  loginUser,
  signupUserSuccess,
  signupUserFailed,
  loginUserSuccess,
  loginUserFailed,
} = Slice.actions;

export default Slice.reducer;
