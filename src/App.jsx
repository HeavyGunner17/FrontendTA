import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Paginas/Home'
import Encuesta from './Paginas/Encuesta'
import Posts from './Paginas/Posts'
import Login from './Paginas/Login'
import Conocenos from './Paginas/Conocenos'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crearEncuesta" element={<Encuesta />} />
        <Route path="/adm" element={<Posts />} />
        <Route path="/login" element= {<Login/>} />
        <Route path='/conocenos' element={<Conocenos/>}/>
        <Route path='/categoria' element={<Categoria/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
