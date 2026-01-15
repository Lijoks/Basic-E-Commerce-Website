import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Get search query from URL
  const searchQuery = searchParams.get('search') || '';
  
  // Get unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  // Filter products based on category AND search
  useEffect(() => {
    let result = products;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Our Products</h1>
      
      {/* Search Results Message */}
      {searchQuery && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-700">
            🔍 Search results for: <span className="font-semibold">"{searchQuery}"</span>
            <span className="ml-4 text-sm">
              ({filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found)
            </span>
          </p>
          <button 
            onClick={() => window.location.href = '/products'}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Clear search and show all products
          </button>
        </div>
      )}
      
      <p className="text-gray-600 mb-8">Discover amazing products at great prices</p>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === category 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Products Count */}
      <div className="mb-6 text-gray-600 flex justify-between items-center">
        <div>
          Showing <span className="font-bold">{filteredProducts.length}</span> of <span className="font-bold">{products.length}</span> products
          {selectedCategory !== 'All' && (
            <span className="ml-2 text-blue-600">
              in <span className="font-semibold">{selectedCategory}</span>
            </span>
          )}
        </div>
        {searchQuery && (
          <button 
            onClick={() => {
              setSelectedCategory('All');
              window.location.href = '/products';
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all filters
          </button>
        )}
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <div className="text-6xl mb-6">😕</div>
          <h3 className="text-2xl font-bold mb-4">No products found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchQuery 
              ? `No products match "${searchQuery}"`
              : `No products available in "${selectedCategory}" category`
            }
          </p>
          <div className="flex gap-4 justify-center">
            {searchQuery && (
              <button 
                onClick={() => window.location.href = '/products'}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Show All Products
              </button>
            )}
            {selectedCategory !== 'All' && (
              <button 
                onClick={() => setSelectedCategory('All')}
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50"
              >
                Show All Categories
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Load More (Optional) */}
          {filteredProducts.length > 8 && (
            <div className="text-center mt-12">
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors">
                Load More Products
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;