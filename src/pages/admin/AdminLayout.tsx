import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  Layers, 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

const SIDEBAR_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Products', icon: Package, path: '/admin/products' },
  { label: 'Add Product', icon: PlusCircle, path: '/admin/add-product' },
  { label: 'Categories', icon: Layers, path: '/admin/categories' },
  { label: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
  { label: 'Customers', icon: Users, path: '/admin/customers' },
  { label: 'Messages', icon: MessageSquare, path: '/admin/messages' },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}


export default function AdminLayout({ children }: AdminLayoutProps) {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-[#2D2D2D] text-white transform transition-transform duration-300 lg:relative lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold tracking-tight">ELITE</Link>
            <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow p-6 space-y-2 overflow-y-auto custom-scrollbar">
            {SIDEBAR_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group",
                  isActive(item.path) 
                    ? "bg-[#FB7701] text-white shadow-lg" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5",
                  isActive(item.path) ? "text-white" : "text-gray-500 group-hover:text-white"
                )} />
                <span className="font-semibold text-sm">{item.label}</span>
                {isActive(item.path) && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-white/5">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3.5 w-full rounded-xl text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all font-semibold text-sm"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 md:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 flex-shrink-0">
          <button className="lg:hidden text-[#2D2D2D] p-2" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden lg:block text-sm text-gray-500 font-medium">
            Welcome back, <span className="text-[#2D2D2D] font-bold underline decoration-[#FB7701]">Administrator</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
              <div className="w-full h-full bg-[#FB7701]/10 flex items-center justify-center text-[#FB7701] font-bold">B</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow overflow-y-auto p-4 md:p-8 custom-scrollbar bg-gray-50/50">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
