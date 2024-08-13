import React from 'react'
import Signup from './components/Signup/Signup'
import { Provider } from 'react-redux'
import Store from './components/redux/Store'
function App() {
  return (
    <div>
      <Provider store={Store}>
      <Signup/>
      </Provider>
    </div>
  )
}

export default App
