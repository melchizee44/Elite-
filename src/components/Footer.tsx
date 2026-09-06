import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">ELITE</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Quality fashion for everyone. We believe fashion should combine quality, comfort, confidence and good value.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#FB7701]">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors text-sm">Shop</Link></li>
              <li><Link to="/vision" className="text-gray-400 hover:text-white transition-colors text-sm">Vision</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#FB7701]">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/shop?category=Shoes" className="text-gray-400 hover:text-white transition-colors text-sm">Shoes</Link></li>
              <li><Link to="/shop?category=Bags" className="text-gray-400 hover:text-white transition-colors text-sm">Bags</Link></li>
              <li><Link to="/shop?category=Clothes" className="text-gray-400 hover:text-white transition-colors text-sm">Clothes</Link></li>
              <li><Link to="/shop?gender=Men" className="text-gray-400 hover:text-white transition-colors text-sm">Men's Collection</Link></li>
              <li><Link to="/shop?gender=Women" className="text-gray-400 hover:text-white transition-colors text-sm">Women's Collection</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#FB7701]">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-[#FB7701]" />
                <a href="tel:09157364936" className="text-gray-400 hover:text-white transition-colors">09157364936</a>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-[#FB7701]" />
                <a href="mailto:bethelbusiness556@gmail.com" className="text-gray-400 hover:text-white transition-colors">bethelbusiness556@gmail.com</a>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <MessageSquare className="w-4 h-4 text-[#FB7701]" />
                <a 
                  href="https://wa.me/2349157364936" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Chat with us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-xs">
            © 2026 Elite Collections. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-xs text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
