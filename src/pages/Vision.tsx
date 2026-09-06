import React from 'react';
import { motion } from 'motion/react';
import { Eye, Rocket, CheckCircle } from 'lucide-react';

export default function Vision() {
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
            OUR VISION
          </motion.h1>
          <div className="h-1 w-20 bg-[#FB7701] mx-auto"></div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 space-y-24">
        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 space-y-6"
          >
            <div className="w-16 h-16 bg-[#FB7701]/10 rounded-2xl flex items-center justify-center">
              <Eye className="w-8 h-8 text-[#FB7701]" />
            </div>
            <h2 className="text-3xl font-bold text-[#2D2D2D]">VISION</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To build a trusted fashion brand known for quality, style, excellent customer service and accessibility.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#2D2D2D] p-10 rounded-3xl shadow-lg text-white space-y-6"
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <Rocket className="w-8 h-8 text-[#FB7701]" />
            </div>
            <h2 className="text-3xl font-bold">MISSION</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              To provide quality fashion products while creating a simple, convenient and trustworthy shopping experience for every customer.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="space-y-12">
          <h2 className="text-4xl font-bold text-[#2D2D2D] text-center">OUR VALUES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              'Quality',
              'Customer Satisfaction',
              'Integrity',
              'Style',
              'Growth'
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm text-center space-y-3 flex flex-col items-center"
              >
                <CheckCircle className="w-8 h-8 text-[#FB7701]" />
                <span className="text-lg font-bold text-[#2D2D2D] uppercase tracking-wider">{value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
