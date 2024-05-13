import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import New from './New'
import Affichage from './Affichage'
import Edit from './Edite'
import Delete from './Delete'

function App() {
  return (
    <>
    <Nav />
      <Routes>
        <Route path="/" element={<Affichage />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/delete/:id" element={<Delete />} />


        </Routes>
    </>
  )
}

export default App