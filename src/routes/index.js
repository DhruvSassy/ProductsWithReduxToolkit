import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import Error404 from './pages/Error404';
import ShoppingCart from './pages/ShoppingCart';
import Login from './pages/Login';

const RoutesPath = () => {
  const token = localStorage.getItem("googleIdToken");

  
  return (
    <BrowserRouter>
      <Routes>
            <Route path="/signIn" element={<Login />} />
            {token ? 
            <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={< AddProduct/>} />
            <Route path="/cartPage" element={<ShoppingCart />} /> 
            </>
            : 
            <>
             <Route path="/" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProduct/>}  />
            <Route path="/edit-product/:id" element={<AddProduct/>}  />
            </>
            } 
            <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPath;
