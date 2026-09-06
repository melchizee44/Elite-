import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, Shield, Zap, Heart } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';

export default function Home() {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:h-[80vh] flex items-center overflow-hidden bg-gray-50 py-12 md:py-0">
        <div className="container mx-auto px-4 md:px-6 z-10">
          <div className="max-w-2xl space-y-4 md:space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#2D2D2D] leading-tight"
            >
              QUALITY STYLE.<br />
              SIMPLE. ELEGANT.<br />
              <span className="text-[#FB7701]">ELITE.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-gray-600 max-w-lg leading-relaxed"
            >
              Discover quality shoes, bags and clothing for men, women and children, carefully selected for style, comfort and everyday confidence.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                to="/shop" 
                className="bg-[#FB7701] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-[#e66c00] transition-colors flex items-center justify-center group shadow-lg"
              >
                SHOP COLLECTION
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex gap-3">
                <Link 
                  to="/shop?gender=Men" 
                  className="flex-1 sm:flex-none text-center bg-[#2D2D2D] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-black transition-colors text-sm md:text-base"
                >
                  SHOP MEN
                </Link>
                <Link 
                  to="/shop?gender=Women" 
                  className="flex-1 sm:flex-none text-center bg-white border-2 border-[#2D2D2D] text-[#2D2D2D] px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-gray-50 transition-colors text-sm md:text-base"
                >
                  SHOP WOMEN
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Abstract background element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#FB7701]/5 -skew-x-12 transform translate-x-1/2"></div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-[#2D2D2D]">FEATURED PRODUCTS</h2>
            <div className="h-1 w-20 bg-[#FB7701]"></div>
          </div>
          <Link to="/shop" className="text-[#FB7701] font-semibold hover:underline flex items-center">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.salePrice && (
                  <span className="absolute top-4 left-4 bg-[#FB7701] text-white text-xs font-bold px-3 py-1 rounded-full">
                    SALE
                  </span>
                )}
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#2D2D2D] hover:bg-[#FB7701] hover:text-white">
                  <Heart className="w-5 h-5" />
                </button>
              </Link>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-[#2D2D2D] group-hover:text-[#FB7701] transition-colors line-clamp-1">{product.name}</h3>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-[#2D2D2D]">{formatPrice(product.price)}</span>
                  {product.salePrice && (
                    <span className="text-sm text-gray-400 line-through">{formatPrice(product.salePrice)}</span>
                  )}
                </div>
                <button 
                  onClick={() => {
                    addToCart(product, 1, product.sizes[0], product.colors[0]);
                    alert('Product added to cart!');
                  }}
                  className="w-full bg-[#2D2D2D] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#FB7701] transition-colors"
                >
                  ADD TO CART
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Shop By Category */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-[#2D2D2D]">SHOP BY CATEGORY</h2>
            <p className="text-gray-500">Explore our curated collections for every occasion</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'SHOES', description: 'Step into quality and style.', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop', link: '/shop?category=Shoes' },
              { title: 'BAGS', description: 'Complete your look with the right bag.', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop', link: '/shop?category=Bags' },
              { title: 'CLOTHES', description: 'Simple fashion for every occasion.', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop', link: '/shop?category=Clothes' },
              { title: 'CANVAS', description: 'Comfortable footwear for daily life.', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop', link: '/shop?category=Canvas' },
              { title: 'SCHOOL', description: 'Durable school shoes for children.', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop', link: '/shop?category=School%20Children' },
            ].map((cat, i) => (
              <Link 
                key={i}
                to={cat.link}
                className="group relative h-96 rounded-2xl overflow-hidden shadow-lg"
              >
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex flex-col justify-end p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">{cat.title}</h3>
                  <p className="text-sm text-gray-200 mb-6">{cat.description}</p>
                  <span className="inline-flex items-center text-[#FB7701] font-bold group-hover:translate-x-2 transition-transform">
                    SHOP {cat.title} <ArrowRight className="ml-2 w-5 h-5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Men & Women Split */}
      <section className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[500px] rounded-3xl overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=800&auto=format&fit=crop" 
            alt="Men's Collection" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10 text-white space-y-4">
            <h3 className="text-4xl font-bold">MEN</h3>
            <p className="text-gray-300 max-w-sm">Quality footwear, bags and clothing for the modern man.</p>
            <Link to="/shop?gender=Men" className="bg-white text-[#2D2D2D] px-8 py-3 rounded-full font-bold hover:bg-[#FB7701] hover:text-white transition-all w-fit">
              SHOP MEN
            </Link>
          </div>
        </div>
        <div className="relative h-[500px] rounded-3xl overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop" 
            alt="Women's Collection" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10 text-white space-y-4">
            <h3 className="text-4xl font-bold">WOMEN</h3>
            <p className="text-gray-300 max-w-sm">Elegant footwear, bags and clothing for every occasion.</p>
            <Link to="/shop?gender=Women" className="bg-white text-[#2D2D2D] px-8 py-3 rounded-full font-bold hover:bg-[#FB7701] hover:text-white transition-all w-fit">
              SHOP WOMEN
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Elite */}
      <section className="bg-[#2D2D2D] py-24 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">WHY CHOOSE ELITE</h2>
            <div className="h-1 w-24 bg-[#FB7701] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { icon: Star, title: 'QUALITY', desc: 'Products selected with quality and durability in mind.' },
              { icon: Zap, title: 'STYLE', desc: 'Fashionable products for modern men and women.' },
              { icon: Shield, title: 'VALUE', desc: 'Quality products at reasonable prices.' },
              { icon: Heart, title: 'TRUST', desc: 'A customer-focused shopping experience.' },
            ].map((item, i) => (
              <div key={i} className="space-y-4 group">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-[#FB7701] transition-colors duration-300">
                  <item.icon className="w-8 h-8 text-[#FB7701] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold tracking-wider">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
