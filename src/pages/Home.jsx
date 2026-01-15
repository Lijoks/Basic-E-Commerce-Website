import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { cart } = useCart();
  
  return (
    <div>
      {/* Hero Section with Background */}
      <div 
        className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-20 px-4"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to <span className="text-yellow-300">ShopEasy</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Your satisfaction is our priority!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🛍️ Shop Now
            </Link>
            <Link 
              to="/cart" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300"
            >
              🛒 View Cart {cart.length > 0 && `(${cart.reduce((sum, item) => sum + item.quantity, 0)})`}
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose ShopEasy?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold mb-3">Free Shipping</h3>
            <p className="text-gray-600">Free delivery on all orders over $50. Fast and reliable shipping worldwide.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-3">Best Prices</h3>
            <p className="text-gray-600">We guarantee the lowest prices on all our products. 30-day price match guarantee.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
            <p className="text-gray-600">Our customer support team is available round the clock to assist you.</p>
          </div>
        </div>
      </div>

      {/* Trending Products Preview */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Trending Products 🔥</h2>
            <Link to="/products" className="text-blue-600 font-semibold hover:text-blue-800 flex items-center">
              View All <span className="ml-2">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Wireless Earbuds", price: "$79.99", emoji: "🎧", color: "from-blue-400 to-blue-600" },
              { name: "Smart Watch", price: "$199.99", emoji: "⌚", color: "from-purple-400 to-purple-600" },
              { name: "Backpack", price: "$59.99", emoji: "🎒", color: "from-green-400 to-green-600" },
              { name: "Coffee Maker", price: "$89.99", emoji: "☕", color: "from-orange-400 to-orange-600" }
            ].map((product, index) => (
              <div key={index} className={`bg-gradient-to-br ${product.color} text-white p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                <div className="text-4xl mb-4">{product.emoji}</div>
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="font-semibold text-xl">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated! ✨</h2>
          <p className="mb-6 max-w-2xl mx-auto">Subscribe to our newsletter and get 10% off your first order!</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-pink-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;