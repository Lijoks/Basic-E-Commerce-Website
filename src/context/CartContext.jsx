import React, { createContext, useState, useContext } from 'react';

// Create the context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Helper function to add toast notifications
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
    
    return id;
  };

  // Remove a specific toast
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Add product to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        addToast(`${product.name} quantity increased!`, 'success');
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      addToast(`${product.name} added to cart!`, 'success');
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      addToast(`${product.name} removed from cart`, 'info');
    }
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update product quantity in cart
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Add/remove product from wishlist
  const addToWishlist = (product) => {
    setWishlist(prev => {
      const isAlreadyInWishlist = prev.find(item => item.id === product.id);
      if (isAlreadyInWishlist) {
        addToast(`${product.name} removed from wishlist`, 'info');
        return prev.filter(item => item.id !== product.id);
      }
      addToast(`${product.name} added to wishlist!`, 'success');
      return [...prev, product];
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      addToast(`${product.name} removed from wishlist`, 'info');
    }
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  // Clear entire cart
  const clearCart = () => {
    if (cart.length > 0) {
      addToast('Cart cleared successfully!', 'info');
    }
    setCart([]);
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Context value
  const contextValue = {
    cart,
    wishlist,
    toasts,
    cartTotal,
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    addToWishlist,
    removeFromWishlist,
    clearCart,
    addToast,
    removeToast,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
      
      {/* Toast notifications container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`px-4 py-3 rounded-lg shadow-lg text-white animate-slide-up ${
              toast.type === 'success' ? 'bg-green-500' :
              toast.type === 'error' ? 'bg-red-500' :
              toast.type === 'warning' ? 'bg-yellow-500' : 
              'bg-blue-500'
            }`}
          >
            <div className="flex items-center justify-between min-w-[200px] max-w-[300px]">
              <div className="flex items-center gap-2">
                {toast.type === 'success' && '✅'}
                {toast.type === 'error' && '❌'}
                {toast.type === 'warning' && '⚠️'}
                {toast.type === 'info' && 'ℹ️'}
                <span className="font-medium">{toast.message}</span>
              </div>
              <button 
                onClick={() => removeToast(toast.id)} 
                className="ml-4 text-white hover:text-gray-200 text-sm"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
};