import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, SlidersHorizontal, Heart, ShoppingBag, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { Category, Gender } from '../types';

export default function Shop() {
  const { products, categories } = useProducts();
  const { addToCart } = useCart();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');
  const initialGender = queryParams.get('gender') as Gender | null;
  const initialSearch = queryParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>(initialCategory || 'All');
  const [selectedGender, setSelectedGender] = useState<Gender | 'All'>(initialGender || 'All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const cat = params.get('category');
    const gen = params.get('gender');

    if (search !== null) setSearchQuery(search);
    if (cat !== null) setSelectedCategory(cat);
    if (gen !== null) setSelectedGender(gen as Gender);
  }, [location.search]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesGender = selectedGender === 'All' || product.gender === selectedGender;
    return matchesSearch && matchesCategory && matchesGender;
  });

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-[#2D2D2D]">SHOP ELITE</h1>
              <p className="text-gray-500">Explore our collection of quality electronics, shoes, bags and clothing for everyone.</p>
            </div>
            <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder="Search products..."
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#FB7701] outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 space-y-10">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#2D2D2D] flex items-center">
                <Filter className="w-5 h-5 mr-2" /> CATEGORIES
              </h3>
              <div className="flex flex-col space-y-3">
                {['All', ...categories].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "text-left py-1 transition-colors hover:text-[#FB7701]",
                      selectedCategory === cat ? "text-[#FB7701] font-bold" : "text-gray-600"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#2D2D2D] flex items-center">
                <SlidersHorizontal className="w-5 h-5 mr-2" /> GENDER
              </h3>
              <div className="flex flex-col space-y-3">
                {['All', 'Men', 'Women', 'Unisex'].map((gen) => (
                  <button
                    key={gen}
                    onClick={() => setSelectedGender(gen as any)}
                    className={cn(
                      "text-left py-1 transition-colors hover:text-[#FB7701]",
                      selectedGender === gen ? "text-[#FB7701] font-bold" : "text-gray-600"
                    )}
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center text-[#2D2D2D] font-bold"
            >
              <Filter className="w-5 h-5 mr-2" /> FILTERS
            </button>
            <span className="text-sm text-gray-500">{filteredProducts.length} Products</span>
          </div>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.salePrice && (
                      <span className="absolute top-4 left-4 bg-[#FB7701] text-white text-xs font-bold px-3 py-1 rounded-full">
                        SALE
                      </span>
                    )}
                    <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#2D2D2D] hover:bg-[#FB7701] hover:text-white">
                      <Heart className="w-5 h-5" />
                    </button>
                  </Link>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold text-[#2D2D2D] group-hover:text-[#FB7701] transition-colors line-clamp-1">{product.name}</h3>
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-[#2D2D2D]">{formatPrice(product.price)}</span>
                      {product.salePrice && (
                        <span className="text-sm text-gray-400 line-through">{formatPrice(product.salePrice)}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => {
                        addToCart(product, 1, product.sizes[0], product.colors[0]);
                        alert(`${product.name} added to cart!`);
                      }}
                      className="w-full border-2 border-[#2D2D2D] text-[#2D2D2D] py-3 rounded-xl text-sm font-bold hover:bg-[#2D2D2D] hover:text-white transition-all flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO CART</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 space-y-4">
                <Search className="w-16 h-16 text-gray-200 mx-auto" />
                <h3 className="text-2xl font-bold text-[#2D2D2D]">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('All'); setSelectedGender('All');}}
                  className="text-[#FB7701] font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filters Overlay */}
      <AnimatePresence>
        {showMobileFilters && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white p-8 space-y-10 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#2D2D2D]">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {['All', ...categories].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                        selectedCategory === cat 
                          ? "bg-[#FB7701] text-white" 
                          : "bg-gray-100 text-[#2D2D2D] hover:bg-gray-200"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Gender</h3>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Men', 'Women', 'Unisex'].map((gen) => (
                    <button
                      key={gen}
                      onClick={() => setSelectedGender(gen as any)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                        selectedGender === gen 
                          ? "bg-[#FB7701] text-white" 
                          : "bg-gray-100 text-[#2D2D2D] hover:bg-gray-200"
                      )}
                    >
                      {gen}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-[#2D2D2D] text-white py-4 rounded-xl font-bold mt-12"
              >
                APPLY FILTERS
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper component for cleaner code
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
