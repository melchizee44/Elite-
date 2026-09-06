import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const NAV_ITEMS = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT US', path: '/about' },
  { label: 'SHOP', path: '/shop' },
  { label: 'VISION', path: '/vision' },
  { label: 'CONTACT', path: '/contact' },
];

import { useCart } from '../context/CartContext';

export default function Header() {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-3" : "bg-white py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-tight text-[#2D2D2D]">
            Elite Collections
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-semibold tracking-wide transition-colors hover:text-[#FB7701]",
                  isActive(item.path) ? "text-[#FB7701]" : "text-[#2D2D2D]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="absolute right-0 flex items-center"
                  >
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="Search..."
                      className="w-full pl-4 pr-10 py-2 rounded-full bg-gray-100 border-none focus:ring-1 focus:ring-[#FB7701] outline-none text-sm font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="absolute right-3 text-gray-400 hover:text-[#FB7701]">
                      <Search className="w-4 h-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              {!isSearchOpen && (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="text-[#2D2D2D] hover:text-[#FB7701] transition-colors p-2"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
              {isSearchOpen && (
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 text-gray-400 hover:text-[#2D2D2D] transition-colors p-2 relative z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <Link to="/cart" className="relative text-[#2D2D2D] hover:text-[#FB7701] transition-colors p-2">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#FB7701] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link 
              to="/admin/login" 
              className="text-[#2D2D2D] hover:text-[#FB7701] transition-colors"
              title="Admin Dashboard"
            >
              <LayoutDashboard className="w-5 h-5" />
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-[#2D2D2D]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-4 flex flex-col">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-lg font-semibold tracking-wide py-2",
                    isActive(item.path) ? "text-[#FB7701]" : "text-[#2D2D2D]"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
