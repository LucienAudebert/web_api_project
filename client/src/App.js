// client/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Order from './pages/Order';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/order" element={<Order />} />
            </Routes>
        </BrowserRouter>
    );
}
