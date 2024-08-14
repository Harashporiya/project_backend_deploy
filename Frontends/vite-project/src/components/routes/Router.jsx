import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from '../Signup/Signup'
import App from '../../App'
import Signin from '../Login/Signin'
import MoviesShow from '../Movies/MoviesShow'
function Routers() {
  return (
   <BrowserRouter>
    <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/" element={<App/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path='/moviesAdd' element={<MoviesShow/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default Routers
