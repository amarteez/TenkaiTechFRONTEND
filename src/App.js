// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Cart from './components/Cart';
import Header from './components/Header';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails'; // Importa el nuevo componente
import ProductList from './components/ProductList';

const App = () => {
    return (
        <CartProvider>
            <Router>
                <Header /> {/* El Header estará presente en todas las páginas */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/products/:id" element={<ProductDetails />} /> {/* Nueva ruta */}
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;
