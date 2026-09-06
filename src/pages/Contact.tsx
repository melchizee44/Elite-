import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#2D2D2D]"
          >
            CONTACT ELITE COLLECTIONS
          </motion.h1>
          <div className="h-1 w-20 bg-[#FB7701] mx-auto"></div>
          <p className="text-gray-600 max-w-xl mx-auto">We would love to hear from you. Get in touch with us for any enquiries.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#2D2D2D]">Get In Touch</h2>
            <div className="space-y-6">
              <a 
                href="tel:09157364936" 
                className="flex items-center space-x-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-[#FB7701]/10 rounded-full flex items-center justify-center group-hover:bg-[#FB7701] transition-colors">
                  <Phone className="w-6 h-6 text-[#FB7701] group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">PHONE</p>
                  <p className="text-lg font-semibold text-[#2D2D2D]">09157364936</p>
                </div>
              </a>

              <a 
                href="mailto:bethelbusiness556@gmail.com" 
                className="flex items-center space-x-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-[#FB7701]/10 rounded-full flex items-center justify-center group-hover:bg-[#FB7701] transition-colors">
                  <Mail className="w-6 h-6 text-[#FB7701] group-hover:text-white" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">EMAIL</p>
                  <p className="text-lg font-semibold text-[#2D2D2D] truncate">bethelbusiness556@gmail.com</p>
                </div>
              </a>

              <a 
                href="https://wa.me/2349157364936" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-[#FB7701]/10 rounded-full flex items-center justify-center group-hover:bg-[#FB7701] transition-colors">
                  <MessageSquare className="w-6 h-6 text-[#FB7701] group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">WHATSAPP</p>
                  <p className="text-lg font-semibold text-[#2D2D2D]">09157364936</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-[#2D2D2D]">Message Sent!</h3>
                    <p className="text-gray-600">Thank you! Your message has been received. We will get back to you shortly.</p>
                  </div>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-[#FB7701] font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#2D2D2D] uppercase">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#FB7701] focus:ring-1 focus:ring-[#FB7701] outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#2D2D2D] uppercase">Email Address</label>
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
                    <label className="text-sm font-bold text-[#2D2D2D] uppercase">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="09157364936"
                      className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#FB7701] focus:ring-1 focus:ring-[#FB7701] outline-none transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#2D2D2D] uppercase">Subject</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Order Enquiry"
                      className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#FB7701] focus:ring-1 focus:ring-[#FB7701] outline-none transition-all"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-[#2D2D2D] uppercase">Message</label>
                    <textarea 
                      required
                      rows={6}
                      placeholder="Your message here..."
                      className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#FB7701] focus:ring-1 focus:ring-[#FB7701] outline-none transition-all resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button 
                      disabled={status === 'loading'}
                      className="w-full bg-[#FB7701] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#e66c00] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {status === 'loading' ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>SEND MESSAGE</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
