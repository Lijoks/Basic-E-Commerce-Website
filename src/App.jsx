import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // Add this
import Header from './components/Header';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login'; // We'll create this
import Signup from './pages/Signup'; // We'll create this
import Profile from './pages/Profile'; // We'll create this

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('ecommerce_user'));
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/orders" 
                  element={
                    <ProtectedRoute>
                      <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
                        <p className="text-gray-600">Your order history will appear here.</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            
            {/* Footer */}
            <footer className="bg-gray-800 text-white mt-12">
              <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">ShopEasy</h2>
                  <p className="text-gray-400">Your favorite e-commerce destination</p>
                  <div className="mt-6 text-gray-400">
                    <p>© 2024 ShopEasy. All rights reserved.</p>
                    <p className="text-sm mt-2">This is a demo e-commerce website built with React & Tailwind CSS</p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;