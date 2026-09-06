import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-8">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-[#2D2D2D]">Your cart is empty</h1>
          <p className="text-gray-500 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our collection and find something you love!</p>
        </div>
        <Link 
          to="/shop" 
          className="inline-flex items-center bg-[#FB7701] text-white px-10 py-4 rounded-full font-bold hover:bg-[#e66c00] transition-colors shadow-lg group"
        >
          START SHOPPING
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#2D2D2D]">SHOPPING CART</h1>
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#FB7701]">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#2D2D2D] font-medium">Cart</span>
          </nav>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex flex-col sm:items-center sm:flex-row gap-6 p-4 md:p-6 bg-white border border-gray-100 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow group"
                >
                  <Link to={`/product/${item.id}`} className="w-full sm:w-24 h-48 sm:h-32 md:w-32 md:h-40 rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                  <div className="flex-grow space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/product/${item.id}`} className="text-lg font-bold text-[#2D2D2D] hover:text-[#FB7701] transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-xs text-gray-500 uppercase font-semibold">{item.category} • {item.brand}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                      {item.selectedSize && (
                        <p><span className="font-bold text-[#2D2D2D]">Size:</span> {item.selectedSize}</p>
                      )}
                      {item.selectedColor && (
                        <p><span className="font-bold text-[#2D2D2D]">Color:</span> {item.selectedColor}</p>
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 gap-4">
                      <div className="flex items-center border border-gray-200 rounded-xl w-fit">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                          className="px-4 py-2 hover:bg-gray-50 text-[#2D2D2D]"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 font-bold min-w-[40px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                          className="px-4 py-2 hover:bg-gray-50 text-[#2D2D2D]"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xl font-bold text-[#FB7701]">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center text-[#FB7701] font-bold hover:underline py-4">
              <ChevronRight className="w-5 h-5 mr-1 transform rotate-180" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#2D2D2D] text-white p-8 rounded-3xl shadow-xl sticky top-28">
              <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-700">ORDER SUMMARY</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="text-white font-bold italic">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-700 pt-4 flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-[#FB7701]">{formatPrice(subtotal)}</span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#FB7701] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#e66c00] transition-colors shadow-lg"
              >
                PROCEED TO CHECKOUT
              </button>
              <div className="mt-8 space-y-4 text-xs text-gray-500">
                <p className="flex items-center"><ChevronRight className="w-3 h-3 mr-2 text-[#FB7701]" /> Secure Payment Processing</p>
                <p className="flex items-center"><ChevronRight className="w-3 h-3 mr-2 text-[#FB7701]" /> Quality Inspected Products</p>
                <p className="flex items-center"><ChevronRight className="w-3 h-3 mr-2 text-[#FB7701]" /> Fast Delivery Across Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
