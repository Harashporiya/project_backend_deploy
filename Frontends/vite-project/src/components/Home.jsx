import React from 'react'
import { useNavigate } from 'react-router'
import Signup from "./Signup/Signup"
const Home = () => {
    const navigate = useNavigate();
  return (
   <>
    <Signup/>
   </>
  )
}

export default Home
