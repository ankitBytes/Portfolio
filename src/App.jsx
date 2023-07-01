import { useState } from 'react'
import Navbar from "./components/navbar";
import About from "./components/about"
import Social from "./components/social"
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <About />
      <Social />
    </>
  )
}

export default App
