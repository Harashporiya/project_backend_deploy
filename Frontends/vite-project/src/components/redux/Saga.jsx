import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
const DEPLOY_URL = import.meta.env.VITE_DEPLOY_URL;

import {
  signupUserSuccess,
  signupUserFailed,
  loginUserSuccess,
  loginUserFailed,
  moviesAddFailed,
  moviesAddSuccess,
} from './Slice'; 



// Worker Saga for Signup
function* signupUserSaga(action) {
  try {
    const response = yield call(axios.post, `${DEPLOY_URL}/user/signup`, action.payload);
    yield put(signupUserSuccess(response.data));
   
  } catch (error) {
    yield put(signupUserFailed(error.message));
  }
}

// Worker Saga for Login
function* loginUserSaga(action) {
  try {
    const response = yield call(axios.post, `${DEPLOY_URL}/user/login`, action.payload);
    yield put(loginUserSuccess(response.data));
  } catch (error) {
    yield put(loginUserFailed(error.message));
  }
}

function* moviesSaga(action){
  try {
    const response = yield call(axios.post, `${DEPLOY_URL}/api/add`, action.payload);
    yield put(moviesAddSuccess(response.data));
  } catch (error) {
    yield put(moviesAddFailed(error.message));
  }
}

// Watcher Saga
function* Saga() {
  yield takeLatest('app/signupUser', signupUserSaga);
  yield takeLatest('app/loginUser', loginUserSaga);
  yield takeLatest('app/moviesAdd', moviesSaga)
}

export default Saga;
