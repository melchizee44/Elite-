import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  ShoppingBag, 
  Briefcase, 
  AlertCircle, 
  ShoppingCart, 
  ArrowUpRight,
  CloudUpload,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { useProducts } from '@/src/context/ProductContext';
import { cn } from '@/src/lib/utils';

export default function AdminDashboardOverview() {
  const { products, isLoading, syncToFirebase, user, login, logout } = useProducts();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; count: number } | null>(null);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-[#FB7701] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSync = async () => {
    if (!user) {
      alert('Please sign in first to sync data to the cloud.');
      return;
    }
    
    setIsSyncing(true);
    try {
      const result = await syncToFirebase();
      setSyncResult(result);
    } catch (error) {
      setSyncResult({ success: false, count: 0 });
    }
    setIsSyncing(false);
    
    // Auto-hide result after 5 seconds
    setTimeout(() => setSyncResult(null), 5000);
  };

  const stats = [
    { label: 'TOTAL CATALOGUE', value: products.length, icon: Package, color: 'blue', trend: '+5%' },
    { label: 'FOOTWEAR', value: products.filter(p => p.category === 'Shoes').length, icon: ShoppingBag, color: 'orange', trend: '+12%' },
    { label: 'ACCESSORIES', value: products.filter(p => p.category === 'Bags').length, icon: Briefcase, color: 'purple', trend: '+2%' },
    { label: 'APPAREL', value: products.filter(p => p.category === 'Clothes').length, icon: Package, color: 'green', trend: '+8%' },
    { label: 'CRITICAL STOCK', value: products.filter(p => p.stockQuantity < 5).length, icon: AlertCircle, color: 'red', trend: '-10%' },
    { label: 'STORE ORDERS', value: 24, icon: ShoppingCart, color: 'indigo', trend: '+18%' },
  ];

  const handleResetData = () => {
    if (window.confirm('This will reset all your product data to the default demo products. Continue?')) {
      localStorage.removeItem('elite_products');
      localStorage.removeItem('elite_categories');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] tracking-tight">System Overview</h1>
          <p className="text-sm md:text-base text-gray-500 font-medium">Monitoring Elite store metrics and inventory health.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {!user ? (
            <button 
              onClick={handleLogin}
              className="px-6 py-3 bg-white text-[#FB7701] border border-[#FB7701]/20 hover:bg-[#FB7701]/5 rounded-xl text-[10px] font-black transition-all shadow-sm uppercase tracking-widest flex items-center justify-center gap-2"
            >
              Sign In to Sync
            </button>
          ) : (
            <div className="flex items-center gap-3 pr-2 border-r border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-[9px] font-black text-[#FB7701] uppercase tracking-tighter">Admin Active</p>
                <p className="text-[10px] font-bold text-gray-400 truncate max-w-[120px]">{user.email}</p>
              </div>
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#FB7701]/10 flex items-center justify-center text-[#FB7701] font-bold">
                  {user.email?.[0].toUpperCase()}
                </div>
              )}
            </div>
          )}
          <button 
            onClick={handleSync}
            disabled={isSyncing || !user}
            className={cn(
              "px-6 py-3 rounded-xl text-[10px] font-black border transition-all shadow-sm uppercase tracking-widest flex items-center justify-center gap-2",
              (isSyncing || !user)
                ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed" 
                : "bg-[#FB7701]/5 text-[#FB7701] border-[#FB7701]/20 hover:bg-[#FB7701] hover:text-white"
            )}
          >
            {isSyncing ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : (
              <CloudUpload className="w-3 h-3" />
            )}
            {isSyncing ? 'Synchronizing...' : 'Sync to Cloud'}
          </button>
          <button 
            onClick={handleResetData}
            className="px-6 py-3 bg-white text-gray-400 hover:text-red-500 rounded-xl text-[10px] font-black border border-gray-100 hover:border-red-100 transition-all shadow-sm uppercase tracking-widest"
          >
            RESET
          </button>
          {user && (
            <button 
              onClick={logout}
              className="px-4 py-3 bg-gray-50 text-gray-400 hover:text-gray-600 rounded-xl text-[10px] font-black border border-gray-100 transition-all uppercase tracking-widest"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {!user && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#FB7701]/5 border border-[#FB7701]/10 p-4 rounded-2xl flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-[#FB7701]" />
          <p className="text-sm text-[#FB7701] font-medium">
            Please <strong>Sign In</strong> to enable Cloud Syncing and protect your database.
          </p>
        </motion.div>
      )}

      <AnimatePresence>
        {syncResult && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "p-4 rounded-2xl flex items-center gap-3 border shadow-sm",
              syncResult.success 
                ? "bg-green-50 border-green-100 text-green-700" 
                : "bg-red-50 border-red-100 text-red-700"
            )}
          >
            {syncResult.success ? (
              <>
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">Successfully uploaded {syncResult.count} items to Firebase!</p>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">Cloud sync failed. Check your connection.</p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-start justify-between group hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
          >
            <div className="space-y-6">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 transform group-hover:rotate-6",
                stat.color === 'blue' && "bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white",
                stat.color === 'orange' && "bg-[#FB7701]/10 text-[#FB7701] group-hover:bg-[#FB7701] group-hover:text-white",
                stat.color === 'purple' && "bg-purple-50 text-purple-500 group-hover:bg-purple-500 group-hover:text-white",
                stat.color === 'green' && "bg-green-50 text-green-500 group-hover:bg-green-500 group-hover:text-white",
                stat.color === 'red' && "bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white",
                stat.color === 'indigo' && "bg-indigo-50 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white",
              )}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">{stat.label}</p>
                <p className="text-4xl font-bold text-[#2D2D2D]">{stat.value}</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center border",
                stat.trend.startsWith('+') ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
              )}>
                <ArrowUpRight className={cn("w-3 h-3 mr-1", !stat.trend.startsWith('+') && "rotate-90")} />
                {stat.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6 md:space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-bold text-[#2D2D2D]">Recent Transactions</h2>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-tighter">Latest orders from the storefront.</p>
            </div>
            <Link to="/admin/orders" className="text-[#FB7701] font-bold text-[10px] md:text-xs hover:underline tracking-widest uppercase">View All</Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold text-[#2D2D2D] border border-gray-100 shadow-sm">
                    {['JD', 'AS', 'BM', 'RK'][i]}
                  </div>
                  <div>
                    <p className="font-bold text-[#2D2D2D] group-hover:text-[#FB7701] transition-colors">{['John Doe', 'Alice Smith', 'Bob Miller', 'Rose Kim'][i]}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">₦{85000 + (i * 15000)} • {i + 1} items</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={cn(
                    "px-3 py-1 text-[9px] font-bold rounded-full uppercase tracking-widest border",
                    i % 2 === 0 ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-green-50 text-green-600 border-green-100"
                  )}>
                    {i % 2 === 0 ? 'PROCESSING' : 'COMPLETED'}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#FB7701] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6 md:space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-bold text-[#2D2D2D]">Latest Inquiries</h2>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-tighter">Customer support and feedback.</p>
            </div>
            <Link to="/admin/messages" className="text-[#FB7701] font-bold text-[10px] md:text-xs hover:underline tracking-widest uppercase">View All</Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-5 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 cursor-pointer group">
                <div className="w-12 h-12 rounded-2xl bg-[#FB7701]/10 flex items-center justify-center text-[#FB7701] font-bold text-xl group-hover:bg-[#FB7701] group-hover:text-white transition-all">
                  {['A', 'J', 'S', 'P'][i]}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-[#2D2D2D] group-hover:text-[#FB7701] transition-colors">{['Alice', 'James', 'Sarah', 'Paul'][i]}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{i + 1}h ago</p>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1 italic font-medium">"I would like to know if you have the premium loafers in size 44..."</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
