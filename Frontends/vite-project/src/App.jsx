import React from 'react'
import Signup from './components/Signup/Signup'
import { Provider } from 'react-redux'
import Store from './components/redux/Store'
import Signin from './components/Login/Signin'

import Router from './components/routes/Router'
export default function App() {
  return (
    <div className = " h-screen w-screen bg-black bg-grid-white/[0.2]  relative flex flex-col  items-center justify-center">
      <div className = " absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" ></div>
      <Provider store={Store}>
      <Router/>
    
      </Provider>
    </div>

  );
}
