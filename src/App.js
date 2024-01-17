import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import React, { useState } from 'react'
import Login from './components/Login'
import Main from './components/Main'
import NotFound from './components/NotFound'
function App () {
  return (
    <BrowserRouter>
      <div className='relative z-10 w-full'>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='*' element={<NotFound />}/>
          <Route path='/main' element={<Main />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
