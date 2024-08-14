import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Router from './components/routes/Router.jsx'
import { Provider } from 'react-redux'
import Store from './components/redux/Store.jsx'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  {/* <Provider store={Store}>
  <Router/>
  </Provider> */}
  
    <App/>
  </React.StrictMode>,
)
