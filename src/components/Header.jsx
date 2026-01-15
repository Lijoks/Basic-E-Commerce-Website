import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Add this import

const Header = () => {
  const { cart, wishlist } = useCart();
  const { user, logout } = useAuth(); // Get user and logout from AuthContext
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Get current path
      const currentPath = window.location.pathname;
      
      if (currentPath === '/products') {
        // If already on products page, refresh with search query
        window.location.href = `/products?search=${encodeURIComponent(searchTerm.trim())}`;
      } else {
        // If on another page, navigate to products with search
        navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      }
      
      setSearchTerm('');
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItemsCount = wishlist.length;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            <span className="flex items-center gap-2">
              <span className="text-3xl">🛒</span>
              ShopEasy
            </span>
          </Link>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-xl w-full">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow"
              />
              <button 
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                aria-label="Search"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </button>
              {searchTerm && (
                <button 
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              )}
            </form>
          </div>
          
          {/* Navigation */}
          <nav className="flex gap-4 md:gap-6 items-center">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="hidden sm:inline">Products</span>
            </Link>
            
            <Link 
              to="/cart" 
              className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group relative"
            >
              <div className="relative">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block">
                <span>Cart</span>
                {cartItemsCount > 0 && (
                  <span className="ml-1 text-sm text-gray-500">
                    (${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)})
                  </span>
                )}
              </div>
            </Link>
            
            <Link 
              to="/wishlist" 
              className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group relative"
            >
              <div className="relative">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {wishlistItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Wishlist</span>
            </Link>
            
            {/* User Menu - Updated with Auth */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                {user ? (
                  <>
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="hidden sm:inline">
                      {user.name ? user.name.split(' ')[0] : 'User'}
                    </span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="hidden sm:inline">Account</span>
                  </>
                )}
              </button>
              
              {/* Dropdown Menu - Updated with conditional rendering */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {user ? (
                    <>
                      {/* User Info */}
                      <div className="px-4 py-2 border-b">
                        <p className="font-semibold truncate">{user.name || 'User'}</p>
                        <p className="text-sm text-gray-500 truncate">
                          {user.email || user.phone || 'No contact info'}
                        </p>
                      </div>
                      
                      {/* User Links */}
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2">
                        <span>👤</span> My Profile
                      </Link>
                      <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2">
                        <span>📦</span> My Orders
                      </Link>
                      <Link to="/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2">
                        <span>❤️</span> My Wishlist
                      </Link>
                      
                      <div className="border-t my-1"></div>
                      
                      {/* Logout */}
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
                      >
                        <span>🚪</span> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Guest Links */}
                      <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2">
                        <span>🔑</span> Sign In
                      </Link>
                      <Link to="/signup" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2">
                        <span>✨</span> Create Account
                      </Link>
                      
                      <div className="border-t my-1"></div>
                      
                      {/* Guest Options */}
                      <Link to="/cart" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2">
                        <span>🛒</span> Guest Checkout
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;