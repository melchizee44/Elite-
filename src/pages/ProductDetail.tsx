import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight, Share2, Heart, MessageSquare, ShieldCheck, Truck, RotateCcw, Zap } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { formatPrice, cn } from '../lib/utils';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();
  const product = getProductById(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-[#FB7701] font-bold hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const whatsappNumber = "2349157364936";
  const enquiryMessage = encodeURIComponent(`Hello Elite Collections, I'm interested in the ${product.name} (${product.sku}). Is it available?`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${enquiryMessage}`;

  return (
    <div className="pb-20">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-4 py-6 flex items-center space-x-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-[#FB7701]">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/shop" className="hover:text-[#FB7701]">Shop</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={`/shop?category=${product.category}`} className="hover:text-[#FB7701]">{product.category}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#2D2D2D] font-medium line-clamp-1">{product.name}</span>
      </nav>

      <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Images */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 shadow-inner"
          >
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                  selectedImage === i ? "border-[#FB7701]" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-gray-100 text-[#2D2D2D] text-xs font-bold rounded-full">{product.brand}</span>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Share2 className="w-5 h-5 text-gray-500" /></button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Heart className="w-5 h-5 text-gray-500" /></button>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] leading-tight">{product.name}</h1>
            <p className="text-gray-500 text-sm">SKU: {product.sku}</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-[#FB7701]">{formatPrice(product.price)}</span>
            {product.salePrice && (
              <span className="text-xl text-gray-400 line-through">{formatPrice(product.salePrice)}</span>
            )}
          </div>

          {product.bulkPrice && product.bulkQuantity && (
            <div className="bg-orange-50 border border-orange-100 p-6 rounded-[2rem] flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#FB7701] rounded-full flex items-center justify-center text-white shadow-lg">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2D2D2D] text-sm uppercase tracking-wide">Bulk Discount</h4>
                  <p className="text-xs text-gray-500 font-medium">Buy {product.bulkQuantity}+ units and save</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-[#FB7701]">{formatPrice(product.bulkPrice)}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">PER UNIT</p>
              </div>
            </div>
          )}

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-6 border-y border-gray-100 py-8">
            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-[#2D2D2D]">SELECT SIZE</label>
                  <button className="text-xs text-[#FB7701] font-bold hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all border-2",
                        selectedSize === size 
                          ? "bg-[#2D2D2D] text-white border-[#2D2D2D]" 
                          : "bg-white text-[#2D2D2D] border-gray-100 hover:border-[#FB7701]"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#2D2D2D]">SELECT COLOR</label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "px-4 py-2 rounded-xl font-semibold transition-all border-2 text-sm",
                        selectedColor === color 
                          ? "bg-[#2D2D2D] text-white border-[#2D2D2D]" 
                          : "bg-white text-[#2D2D2D] border-gray-100 hover:border-[#FB7701]"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center space-x-6">
              <label className="text-sm font-bold text-[#2D2D2D]">QUANTITY</label>
              <div className="flex items-center border border-gray-200 rounded-xl">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-50 text-xl"
                >-</button>
                <span className="px-4 font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-50 text-xl"
                >+</button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => {
                if (product.sizes.length > 0 && !selectedSize) {
                  alert('Please select a size');
                  return;
                }
                if (product.colors.length > 0 && !selectedColor) {
                  alert('Please select a color');
                  return;
                }
                addToCart(product, quantity, selectedSize || product.sizes[0], selectedColor || product.colors[0]);
                alert('Product added to cart!');
              }}
              className="flex-grow bg-[#2D2D2D] text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-black transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>ADD TO CART</span>
            </button>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow bg-[#FB7701] text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-[#e66c00] transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WHATSAPP ENQUIRY</span>
            </a>
          </div>

          {/* Service Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-50 p-2 rounded-lg"><Truck className="w-5 h-5 text-[#FB7701]" /></div>
              <p className="text-xs font-semibold text-gray-600 leading-tight">Fast Nationwide Delivery</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gray-50 p-2 rounded-lg"><RotateCcw className="w-5 h-5 text-[#FB7701]" /></div>
              <p className="text-xs font-semibold text-gray-600 leading-tight">Easy Returns & Exchange</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gray-50 p-2 rounded-lg"><ShieldCheck className="w-5 h-5 text-[#FB7701]" /></div>
              <p className="text-xs font-semibold text-gray-600 leading-tight">100% Quality Guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Products (Random from same category) */}
      <section className="container mx-auto px-4 py-20 border-t border-gray-100 mt-20">
        <h2 className="text-2xl font-bold text-[#2D2D2D] mb-12">YOU MAY ALSO LIKE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map((p) => (
            <motion.div 
              key={p.id}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all"
            >
              <Link to={`/product/${p.id}`} className="block aspect-[4/5] overflow-hidden">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              </Link>
              <div className="p-4 space-y-2">
                <Link to={`/product/${p.id}`} className="font-semibold text-[#2D2D2D] group-hover:text-[#FB7701] transition-colors line-clamp-1">{p.name}</Link>
                <p className="text-[#FB7701] font-bold">{formatPrice(p.price)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
