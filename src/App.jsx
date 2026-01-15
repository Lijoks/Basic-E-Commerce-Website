import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <footer className="bg-gray-800 text-white mt-12">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">ShopEasy</h2>
                <p className="text-gray-400">Your favorite E-Commerce destination</p>
                <div className="mt-6 text-gray-400">
                  <p>© 2026 ShopEasy. All rights reserved.</p>
                  <p className="text-sm mt-2">This is a simple E-Commerce website built with React & Tailwind CSS</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;