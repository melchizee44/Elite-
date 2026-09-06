import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ShieldCheck, MapPin, Phone, Mail, User, CreditCard, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const deliveryFee = 2000; // Demo fee
  const total = subtotal + deliveryFee;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    address: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate order placement
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Order placed successfully! In a real app, this would redirect to payment or show a success screen.');
      clearCart();
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link to="/shop" className="text-[#FB7701] font-bold hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#2D2D2D]">CHECKOUT</h1>
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/cart" className="hover:text-[#FB7701]">Cart</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#2D2D2D] font-medium">Checkout</span>
          </nav>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Delivery Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-8">
              <div className="flex items-center space-x-3 text-[#2D2D2D]">
                <MapPin className="w-6 h-6 text-[#FB7701]" />
                <h2 className="text-2xl font-bold">DELIVERY INFORMATION</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#2D2D2D] uppercase flex items-center">
                    <User className="w-4 h-4 mr-2" /> Full Name
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#FB7701] focus:ring-1 focus:ring-[#FB7701] outline-none transition-all"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#2D2D2D] uppercase flex items-center">
                    <Phone className="w-4 h-4 mr-2" /> Phone Number
                  </label>
                  <input 
                    required
                    type="tel" 
                    placeholder="09157364936"
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#FB7701] focus:ring-1 focus:ring-[#FB7701] outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-[#2D2D2D] uppercase flex items-center">
                    <Mail className="w-4 h-4 mr-2" /> Email Address
                  </label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#FB7701] focus:ring-1 focus:ring-[#FB7701] outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#2D2D2D] uppercase flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> State
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="Lagos"
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#FB7701] focus:ring-1 focus:ring-[#FB7701] outline-none transition-all"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#2D2D2D] uppercase flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> City
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ikeja"
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#FB7701] focus:ring-1 focus:ring-[#FB7701] outline-none transition-all"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-[#2D2D2D] uppercase flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> Delivery Address
                  </label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Street address, apartment, suite, etc."
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#FB7701] focus:ring-1 focus:ring-[#FB7701] outline-none transition-all resize-none"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  ></textarea>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-[#2D2D2D] uppercase">Order Notes (Optional)</label>
                  <textarea 
                    rows={2}
                    placeholder="Special instructions for delivery..."
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#FB7701] focus:ring-1 focus:ring-[#FB7701] outline-none transition-all resize-none"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Payment Method Placeholder */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center space-x-3 text-[#2D2D2D]">
                <CreditCard className="w-6 h-6 text-[#FB7701]" />
                <h2 className="text-2xl font-bold uppercase">Payment Method</h2>
              </div>
              <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-[#FB7701] transition-all">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 rounded-full border-2 border-[#FB7701] flex items-center justify-center">
                    <div className="w-3 h-3 bg-[#FB7701] rounded-full"></div>
                  </div>
                  <span className="font-bold text-[#2D2D2D]">Secure Online Payment</span>
                </div>
                <div className="flex space-x-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-50" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-4 opacity-50" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50" />
                </div>
              </div>
              <p className="text-sm text-gray-500 italic">Pay securely with your credit/debit card. Integration with Paystack/Flutterwave coming soon.</p>
            </div>
          </div>

          {/* Sidebar Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#2D2D2D] text-white p-8 rounded-3xl shadow-xl">
              <h2 className="text-xl font-bold mb-8 pb-4 border-b border-gray-700 uppercase">Your Order</h2>
              
              <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-sm font-bold truncate">{item.name}</h4>
                      <p className="text-xs text-gray-400">Qty: {item.quantity} • {item.selectedSize || 'N/A'}</p>
                      <p className="text-sm font-bold text-[#FB7701] mt-1">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-700">
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="text-white font-bold">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-gray-700">
                  <span>Total</span>
                  <span className="text-[#FB7701]">{formatPrice(total)}</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FB7701] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#e66c00] transition-all mt-8 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <>
                    <ShieldCheck className="w-6 h-6" />
                    <span>PLACE ORDER</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span className="text-xs font-bold uppercase tracking-wider">Secure Checkout</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
              </p>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
