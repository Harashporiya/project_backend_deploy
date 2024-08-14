import React from 'react'
import Signup from './components/Signup/Signup'
import { Provider } from 'react-redux'
import Store from './components/redux/Store'
import Signin from './components/Login/Signin'

import Router from './components/routes/Router'
export default function App() {
  return (
   <>
     <Provider store={Store}>
      <Router/>
      </Provider>
   </>
     
    

  );
}
