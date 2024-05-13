import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import New from './New'
import Affichage from './Affichage'
import Edit from './Edite'

function App() {
  return (
    <>
    <Nav />
      <Routes>
        <Route path="/" element={<Affichage />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/:InstrumentId" component={ProductDetail} />

        </Routes>
    </>
  )
}

export default App