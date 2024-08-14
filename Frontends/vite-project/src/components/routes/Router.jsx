import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from '../Signup/Signup'
import App from '../../App'
import Signin from '../Login/Signin'
import MoviesShow from '../Movies/MoviesShow'
import AddMovies from '../Movies/AddMovies'
import Home from '../Home'
function Routers() {
  return (
   <BrowserRouter>
    <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin/>} />
        <Route path='/moviesShow' element={<MoviesShow/>}/>
        <Route path='/addMovies' element={<AddMovies/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default Routers
