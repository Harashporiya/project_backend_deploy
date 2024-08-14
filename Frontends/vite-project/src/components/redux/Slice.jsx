import { createSlice } from '@reduxjs/toolkit';

// User slice
const Slice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    movies:null,
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
    moviesAdd:(state)=>{
      state.status = 'loading'
    },
    moviesAddSuccess:(state, action)=>{
      state.status = 'succeeded';
      state.movies = action.payload.movies;
      state.token = action.payload.token;
    },
    moviesAddFailed: (state, action)=>{
      state.status = 'failed';
      state.error = action.payload;
    }
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
  moviesAddFailed,
  moviesAddSuccess,
  moviesAdd,
} = Slice.actions;

export default Slice.reducer;
