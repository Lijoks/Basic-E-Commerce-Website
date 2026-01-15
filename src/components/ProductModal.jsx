import React from 'react';
import { useCart } from '../context/CartContext';

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart, addToWishlist, wishlist } = useCart();
  const isInWishlist = wishlist.some(item => item.id === product.id);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full rounded-xl shadow-lg"
              />
            </div>
            
            <div>
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
              </div>
              
              <p className="text-gray-700 mb-6 text-lg">{product.description}</p>
              
              <div className="text-4xl font-bold text-blue-600 mb-6">
                ${product.price.toFixed(2)}
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    addToCart(product);
                    alert(`${product.name} added to cart!`);
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  🛒 Add to Cart
                </button>
                
                <button
                  onClick={() => {
                    addToWishlist(product);
                    alert(`${product.name} ${isInWishlist ? 'removed from' : 'added to'} wishlist!`);
                  }}
                  className={`w-full border py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    isInWishlist 
                      ? 'border-red-300 text-red-600 hover:bg-red-50' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isInWishlist ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-semibold mb-2">Product Details:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>✅ Free shipping on this item</li>
                  <li>✅ 30-day return policy</li>
                  <li>✅ 1-year warranty</li>
                  <li>✅ Customer support included</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;