import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Upload, Plus, X, Save, Info, Layers, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Category, Gender, ProductStatus } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { useProducts } from '@/src/context/ProductContext';

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const { addProduct, categories } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0] || 'Shoes',
    gender: 'Men' as Gender,
    brand: 'Elite',
    description: '',
    price: '',
    salePrice: '',
    bulkPrice: '',
    bulkQuantity: '',
    sku: '',
    stockQuantity: '',
    status: 'Published' as ProductStatus,
    sizes: [] as string[],
    colors: [] as string[],
  });

  const [images, setImages] = useState<string[]>([]);
  const [newSize, setNewSize] = useState('');
  const [newColor, setNewColor] = useState('');

  const handleAddSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData({ ...formData, sizes: [...formData.sizes, newSize] });
      setNewSize('');
    }
  };

  const handleAddColor = () => {
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData({ ...formData, colors: [...formData.colors, newColor] });
      setNewColor('');
    }
  };

  const handleRemoveSize = (size: string) => {
    setFormData({ ...formData, sizes: formData.sizes.filter(s => s !== size) });
  };

  const handleRemoveColor = (color: string) => {
    setFormData({ ...formData, colors: formData.colors.filter(c => c !== color) });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImages([...images, base64String]);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    try {
      await addProduct({
        name: formData.name,
        category: formData.category,
        gender: formData.gender,
        brand: formData.brand,
        description: formData.description,
        price: parseInt(formData.price) || 0,
        salePrice: formData.salePrice ? parseInt(formData.salePrice) : undefined,
        bulkPrice: formData.bulkPrice ? parseInt(formData.bulkPrice) : undefined,
        bulkQuantity: formData.bulkQuantity ? parseInt(formData.bulkQuantity) : undefined,
        sku: formData.sku,
        stockQuantity: parseInt(formData.stockQuantity) || 0,
        status: formData.status,
        sizes: formData.sizes,
        colors: formData.colors,
        images: images,
      });

      alert('Product added successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <Link to="/admin/products" className="p-3 bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 text-gray-500 hover:text-[#FB7701] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#2D2D2D]">Add New Product</h1>
            <p className="text-sm text-gray-500">Create a new entry for your store collection.</p>
          </div>
        </div>
        <button 
          type="submit"
          form="add-product-form"
          className="w-full md:w-auto bg-[#FB7701] text-white px-8 py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:bg-[#e66c00] transition-colors"
        >
          <Save className="w-5 h-5" />
          <span>PUBLISH PRODUCT</span>
        </button>
      </div>

      <form 
        id="add-product-form"
        onSubmit={handleSubmit} 
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-lg font-bold text-[#2D2D2D] flex items-center">
              <Info className="w-5 h-5 mr-2 text-[#FB7701]" /> Basic Information
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Classic Leather Loafers"
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Category</label>
                  <select 
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none font-semibold text-sm"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Gender</label>
                  <select 
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none font-semibold text-sm"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value as any})}
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="Tell customers more about this product..."
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Inventory & Variants */}
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 space-y-8">
            <h3 className="text-lg font-bold text-[#2D2D2D] flex items-center">
              <Layers className="w-5 h-5 mr-2 text-[#FB7701]" /> Inventory & Variants
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sizes</label>
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Add size (e.g. 42, XL)"
                      className="flex-grow px-5 py-3 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none text-sm"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSize())}
                    />
                    <button 
                      type="button" 
                      onClick={handleAddSize}
                      className="p-3 bg-gray-50 text-gray-400 hover:text-[#FB7701] rounded-xl transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formData.sizes.map(size => (
                      <span key={size} className="flex items-center bg-gray-50 text-[#2D2D2D] font-bold text-xs px-3 py-1.5 rounded-lg border border-gray-100">
                        {size}
                        <button type="button" onClick={() => handleRemoveSize(size)} className="ml-2 text-gray-400 hover:text-red-500"><X className="w-3 h-3 pointer-events-none" /></button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Colors</label>
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Add color (e.g. Black)"
                      className="flex-grow px-5 py-3 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none text-sm"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddColor())}
                    />
                    <button 
                      type="button" 
                      onClick={handleAddColor}
                      className="p-3 bg-gray-50 text-gray-400 hover:text-[#FB7701] rounded-xl transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formData.colors.map(color => (
                      <span key={color} className="flex items-center bg-gray-50 text-[#2D2D2D] font-bold text-xs px-3 py-1.5 rounded-lg border border-gray-100">
                        {color}
                        <button type="button" onClick={() => handleRemoveColor(color)} className="ml-2 text-gray-400 hover:text-red-500"><X className="w-3 h-3 pointer-events-none" /></button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">SKU Number</label>
                <input 
                  required
                  type="text" 
                  placeholder="BTL-XXX-000"
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none transition-all"
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Stock Quantity</label>
                <input 
                  required
                  type="number" 
                  placeholder="0"
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none transition-all"
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData({...formData, stockQuantity: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Media & Sidebar */}
        <div className="space-y-8">
          {/* Status */}
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Status</label>
            <div className="space-y-3">
              {(['Published', 'Draft', 'Out of Stock'] as ProductStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFormData({...formData, status})}
                  className={cn(
                    "w-full text-left px-5 py-4 rounded-xl font-bold text-sm transition-all border-2",
                    formData.status === status 
                      ? "bg-[#2D2D2D] text-white border-[#2D2D2D]" 
                      : "bg-gray-50 text-gray-400 border-transparent hover:border-gray-200"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-[#2D2D2D] uppercase tracking-widest">Pricing (₦)</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Regular Price</label>
                <input 
                  required
                  type="number" 
                  placeholder="0"
                  className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none font-bold"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Sale Price (Optional)</label>
                <input 
                  type="number" 
                  placeholder="0"
                  className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none font-bold text-[#FB7701]"
                  value={formData.salePrice}
                  onChange={(e) => setFormData({...formData, salePrice: e.target.value})}
                />
              </div>

              <div className="pt-4 border-t border-gray-50 space-y-4">
                <h4 className="text-[10px] font-bold text-[#FB7701] uppercase tracking-widest flex items-center">
                  <Zap className="w-3 h-3 mr-1" /> Bulk Offer (Optional)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Bulk Price (₦)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 15000"
                      className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none font-bold"
                      value={formData.bulkPrice}
                      onChange={(e) => setFormData({...formData, bulkPrice: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Min Qty for Bulk</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 6"
                      className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none font-bold"
                      value={formData.bulkQuantity}
                      onChange={(e) => setFormData({...formData, bulkQuantity: e.target.value})}
                    />
                  </div>
                </div>
                <p className="text-[9px] text-gray-400 leading-tight italic">Offer a lower price when customers buy a certain quantity.</p>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-[#2D2D2D] uppercase tracking-widest">Product Images</h3>
            <div className="grid grid-cols-2 gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 group">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                    className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="w-3 h-3 pointer-events-none" />
                  </button>
                </div>
              ))}
              {images.length < 4 && (
                <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#FB7701] hover:bg-gray-50 transition-all group">
                  <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#FB7701]" />
                  <span className="text-[10px] font-bold text-gray-400 mt-2">UPLOAD</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>
            <p className="text-[10px] text-gray-400 leading-tight">Add up to 4 images. First image will be the primary thumbnail.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
