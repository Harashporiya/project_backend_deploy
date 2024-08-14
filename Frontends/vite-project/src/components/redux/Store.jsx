import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import appReducer from './Slice'; 
import Saga from './Saga'; 

const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({
  reducer: {
   app : appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(Saga);

export default Store;
