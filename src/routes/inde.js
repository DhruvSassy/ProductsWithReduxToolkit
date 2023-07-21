import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'

const RoutesPath = () => {
  return (
    <> 
        <BrowserRouter>
    <Routes>
         <Route path='/' element={<Dashboard/>} />
         <Route path='/add-product' element={<AddProduct/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default RoutesPath