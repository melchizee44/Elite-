import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Vision from './pages/Vision';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardOverview from './pages/admin/AdminDashboardOverview';
import AdminProductsList from './pages/admin/AdminProductsList';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSettings from './pages/admin/AdminSettings';
import AdminCategories from './pages/admin/AdminCategories';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/shop" element={<Layout><Shop /></Layout>} />
              <Route path="/vision" element={<Layout><Vision /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/cart" element={<Layout><Cart /></Layout>} />
              <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
              <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Routes>
                        <Route index element={<AdminDashboardOverview />} />
                        <Route path="products" element={<AdminProductsList />} />
                        <Route path="add-product" element={<AdminAddProduct />} />
                        <Route path="edit-product/:id" element={<AdminEditProduct />} />
                        <Route path="messages" element={<AdminMessages />} />
                        <Route path="settings" element={<AdminSettings />} />
                        <Route path="categories" element={<AdminCategories />} />
                        <Route path="orders" element={<div className="p-20 text-center text-gray-400 font-bold uppercase tracking-[0.2em] animate-pulse">Orders Management (System Integration Required)</div>} />
                        <Route path="customers" element={<div className="p-20 text-center text-gray-400 font-bold uppercase tracking-[0.2em] animate-pulse">Customers Management (System Integration Required)</div>} />
                      </Routes>
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
