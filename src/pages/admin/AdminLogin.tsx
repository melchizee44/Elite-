import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, ArrowLeft, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    setTimeout(() => {
      const success = login(password);
      if (success) {
        navigate('/admin');
      } else {
        setError(true);
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Link 
        to="/" 
        className="mb-8 flex items-center text-gray-500 hover:text-[#2D2D2D] transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Elite
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="bg-[#2D2D2D] p-8 text-white text-center space-y-2">
          <div className="w-16 h-16 bg-[#FB7701] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">ADMIN ACCESS</h1>
          <p className="text-gray-400 text-sm">Enter password to manage Elite Collections</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center"
            >
              <ShieldAlert className="w-4 h-4 mr-2 flex-shrink-0" />
              Incorrect password. Please try again.
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input 
                required
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#FB7701] focus:ring-1 focus:ring-[#FB7701] outline-none transition-all pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#FB7701] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#e66c00] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              <span>LOGIN TO DASHBOARD</span>
            )}
          </button>
        </form>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">© 2026 Elite Admin Panel. Authorized Access Only.</p>
        </div>
      </motion.div>
    </div>
  );
}
