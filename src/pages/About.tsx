import React from 'react';
import { motion } from 'motion/react';
import { Shield, Target, Users, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#2D2D2D]"
          >
            ABOUT ELITE COLLECTIONS
          </motion.h1>
          <div className="h-1 w-20 bg-[#FB7701] mx-auto"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed pt-4">
            Elite Collections is a fashion and footwear business committed to providing quality shoes, bags and clothing for men, women and children.
          </p>
        </div>
      </section>

      {/* Quote */}
      <section className="container mx-auto px-4 py-20 text-center">
        <blockquote className="text-2xl md:text-3xl italic text-[#2D2D2D] max-w-4xl mx-auto leading-relaxed">
          "We believe fashion should combine quality, comfort, confidence and good value. Our goal is to make it easier for customers to find products that suit their personality, lifestyle and everyday needs."
        </blockquote>
      </section>

      {/* Sections */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 py-20">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-[#FB7701]">
            <Users className="w-8 h-8" />
            <h2 className="text-2xl font-bold">WHO WE ARE</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Founded with a passion for Nigerian fashion, Elite Collections is more than just a store. We are a team of dedicated fashion enthusiasts who understand the importance of quality and style in everyday life. We carefully select every item in our catalogue to ensure it meets our high standards.
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-[#FB7701]">
            <Target className="w-8 h-8" />
            <h2 className="text-2xl font-bold">WHAT WE OFFER</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            From classic leather loafers to elegant handbags and premium clothing, we offer a diverse range of products for men, women and children. Our collections are designed to provide confidence and comfort, whether you're at school, at work, at a social event, or enjoying a casual day out.
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-[#FB7701]">
            <Shield className="w-8 h-8" />
            <h2 className="text-2xl font-bold">OUR PROMISE</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            At Elite Collections, our promise is simple: Quality without compromise. We work tirelessly to source materials and products that are durable, stylish, and offered at fair prices. We are committed to transparency and integrity in everything we do.
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-[#FB7701]">
            <Heart className="w-8 h-8" />
            <h2 className="text-2xl font-bold">OUR CUSTOMERS</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Our customers are at the heart of our business. We strive to provide a seamless shopping experience, from browsing our website to receiving your order. We listen to your feedback and continuously improve our services to meet your needs.
          </p>
        </div>
      </section>
    </div>
  );
}
