import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Plus, Trash2, Search, AlertCircle } from 'lucide-react';
import { useProducts } from '@/src/context/ProductContext';
import { cn } from '@/src/lib/utils';

export default function AdminCategories() {
  const { categories, addCategory, deleteCategory, products } = useProducts();
  const [newCategory, setNewCategory] = useState('');
  const [search, setSearch] = useState('');

  const filteredCategories = categories.filter(c => 
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      await addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleDelete = async (category: string) => {
    const productsInCat = products.filter(p => p.category === category);
    if (productsInCat.length > 0) {
      alert(`Cannot delete category "${category}" because it contains ${productsInCat.length} products. Move or delete the products first.`);
      return;
    }
    if (window.confirm(`Are you sure you want to delete the "${category}" category?`)) {
      await deleteCategory(category);
    }
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-[#2D2D2D]">Category Management</h1>
          <p className="text-gray-500">Organize your store catalogue by creating and managing categories.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Category Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6 sticky top-8">
            <h3 className="text-lg font-bold text-[#2D2D2D] flex items-center">
              <Plus className="w-5 h-5 mr-2 text-[#FB7701]" /> New Category
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sleeves, Footwear"
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none transition-all font-semibold"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#FB7701] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#e66c00] transition-all hover:scale-[1.02] active:scale-95"
              >
                CREATE CATEGORY
              </button>
            </form>
            <div className="bg-orange-50 p-4 rounded-2xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-[#FB7701] flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-[#FB7701]/80 font-medium leading-relaxed">
                Categories help customers filter products in your shop. Keep names short and descriptive.
              </p>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <Search className="w-5 h-5 text-gray-300 ml-2" />
            <input 
              type="text" 
              placeholder="Search categories..."
              className="flex-grow px-4 py-2 border-none focus:ring-0 outline-none text-sm font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-50">
              {filteredCategories.map((category) => {
                const count = products.filter(p => p.category === category).length;
                return (
                  <div key={category} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#FB7701] transition-colors shadow-sm">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[#2D2D2D]">{category}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{count} {count === 1 ? 'Product' : 'Products'}</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleDelete(category);
                      }}
                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95 border border-transparent hover:border-red-100 flex items-center justify-center"
                      title="Delete Category"
                    >
                      <Trash2 className="w-5 h-5 pointer-events-none" />
                    </button>
                  </div>
                );
              })}

              {filteredCategories.length === 0 && (
                <div className="p-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                    <Layers className="w-8 h-8 text-gray-200" />
                  </div>
                  <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">No Categories Found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
