import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { DEPLOY_URL } from '../backend_API/API';
import {
  signupUserSuccess,
  signupUserFailed,
  loginUserSuccess,
  loginUserFailed,
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

// Watcher Saga
function* Saga() {
  yield takeLatest('user/signupUser', signupUserSaga);
  yield takeLatest('user/loginUser', loginUserSaga);
}

export default Saga;
