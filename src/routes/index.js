import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import Error404 from './pages/Error404';
import ShoppingCart from './pages/ShoppingCart';
import Login from './pages/Login';
import Protected from '../components/Protected';

const RoutesPath = () => {
  

  
  return (
    <BrowserRouter>
      <Routes>
            <Route path="/signin" element={<Protected component={Login} />} />
            <Route path="/" element={<Protected component={Dashboard} />} />
            <Route path="/add-product" element={<Protected component={AddProduct} />} />
            <Route path="/edit-product/:id" element={<Protected component={AddProduct} />} />
            <Route path="/cartPage" element={<Protected component={ ShoppingCart} />} />
            <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPath;
