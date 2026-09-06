import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  TrendingDown, 
  Edit2, 
  Trash2, 
  MoreVertical, 
  Search, 
  Filter, 
  Plus,
  Eye,
  RefreshCcw,
  ExternalLink,
  Zap
} from 'lucide-react';
import { useProducts } from '@/src/context/ProductContext';
import { formatPrice, cn } from '@/src/lib/utils';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminProductsList() {
  const navigate = useNavigate();
  const { products, deleteProduct, updateProduct, categories, isLoading } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-[#FB7701] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = (p.name?.toLowerCase() || '').includes(search.toLowerCase()) || (p.sku?.toLowerCase() || '').includes(search.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Attempting to delete product:', id);
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct(id);
        // Optional: show a toast or notification instead of alert
        console.log('Product deleted successfully');
      } catch (err) {
        console.error('Failed to delete product:', err);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const handleEdit = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Navigating to edit product:', id);
    navigate(`/admin/edit-product/${id}`);
  };

  const handleToggleStatus = async (e: React.MouseEvent, id: string, currentStatus: string) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
    try {
      await updateProduct(id, { status: newStatus as any });
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update product status');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D2D2D]">Product Management</h1>
          <p className="text-sm text-gray-500">Manage, edit, and organize your fashion catalogue.</p>
        </div>
        <Link 
          to="/admin/add-product" 
          className="w-full md:w-auto bg-[#FB7701] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:bg-[#e66c00] transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>ADD NEW PRODUCT</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search products..."
            className="w-full pl-12 pr-6 py-3 md:py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none transition-all font-medium text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
              className="w-full pl-10 pr-4 py-3 md:py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none appearance-none font-bold text-xs md:text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table/Grid */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stock</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 bg-gray-50 flex items-center justify-center">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-6 h-6 text-gray-200" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-[#2D2D2D] line-clamp-1">{product.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full uppercase tracking-tighter border border-gray-200">{product.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      <p className="font-bold text-[#2D2D2D]">{formatPrice(product.price)}</p>
                      {product.bulkPrice && (
                        <div className="flex items-center text-[#FB7701]" title={`Bulk: ${formatPrice(product.bulkPrice)} (Min ${product.bulkQuantity})`}>
                          <Zap className="w-3 h-3 fill-current" />
                          <span className="text-[8px] font-black uppercase tracking-tighter ml-0.5">BULK</span>
                        </div>
                      )}
                    </div>
                    {product.salePrice && <p className="text-[10px] text-red-400 line-through font-bold">{formatPrice(product.salePrice)}</p>}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      <span className={cn(
                        "font-bold text-sm",
                        product.stockQuantity < 5 ? "text-red-500" : "text-[#2D2D2D]"
                      )}>{product.stockQuantity}</span>
                      {product.stockQuantity < 5 && <TrendingDown className="w-3 h-3 text-red-500" />}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleToggleStatus(e, product.id, product.status);
                      }}
                      className={cn(
                        "px-3 py-1 text-[10px] font-bold rounded-full uppercase transition-all hover:scale-105 active:scale-95 border",
                        product.status === 'Published' 
                          ? "bg-green-50 text-green-600 border-green-100" 
                          : product.status === 'Out of Stock'
                            ? "bg-red-50 text-red-600 border-red-100"
                            : "bg-gray-100 text-gray-400 border-gray-200"
                      )}
                    >
                      {product.status}
                    </button>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        type="button"
                        onClick={(e) => handleEdit(e, product.id)}
                        className="p-3 bg-white text-gray-600 hover:text-[#FB7701] transition-all rounded-xl shadow-sm border border-gray-100 flex items-center justify-center hover:scale-110 active:scale-95 hover:border-[#FB7701]"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4 pointer-events-none" />
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => handleDelete(e, product.id, product.name)}
                        className="p-3 bg-white text-gray-400 hover:text-red-500 transition-all rounded-xl shadow-sm border border-gray-100 flex items-center justify-center hover:scale-110 active:scale-95 hover:border-red-500"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4 pointer-events-none" />
                      </button>
                      <a 
                        href={`/product/${product.id}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 bg-white text-gray-400 hover:text-blue-500 transition-all rounded-xl shadow-sm border border-gray-100 flex items-center justify-center hover:scale-110 active:scale-95 hover:border-blue-500"
                        title="View in Store"
                      >
                        <ExternalLink className="w-4 h-4 pointer-events-none" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Grid View */}
        <div className="lg:hidden p-4 space-y-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 bg-white flex items-center justify-center">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Package className="w-6 h-6 text-gray-200" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2D2D2D] leading-tight">{product.name}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">{product.sku}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="px-2 py-0.5 bg-white text-gray-500 text-[9px] font-bold rounded-md uppercase border border-gray-100">{product.category}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    {product.bulkPrice && <Zap className="w-2 h-2 text-[#FB7701] fill-current" />}
                    <p className="font-bold text-sm text-[#2D2D2D]">{formatPrice(product.price)}</p>
                  </div>
                  <p className="text-[10px] font-bold text-gray-400">{product.stockQuantity} in stock</p>
                </div>
              </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleToggleStatus(e, product.id, product.status);
                  }}
                  className={cn(
                    "px-3 py-1.5 text-[9px] font-bold rounded-lg uppercase border",
                    product.status === 'Published' ? "bg-green-50 text-green-600 border-green-100" : "bg-gray-100 text-gray-400 border-gray-200"
                  )}
                >
                  {product.status}
                </button>
                <div className="flex items-center space-x-2">
                  <button 
                    type="button"
                    onClick={(e) => handleEdit(e, product.id)}
                    className="p-3 bg-white text-gray-600 rounded-xl border border-gray-200 active:scale-95 transition-all"
                  >
                    <Edit2 className="w-4 h-4 pointer-events-none" />
                  </button>
                  <button 
                    type="button"
                    onClick={(e) => handleDelete(e, product.id, product.name)}
                    className="p-3 bg-white text-red-500 rounded-xl border border-gray-200 active:scale-95 transition-all"
                  >
                    <Trash2 className="w-4 h-4 pointer-events-none" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
              <Package className="w-10 h-10 text-gray-200" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest">No products found</h3>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
