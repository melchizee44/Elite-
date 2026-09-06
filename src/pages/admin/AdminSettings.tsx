import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  Share2, 
  Save, 
  RotateCcw,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { INITIAL_SETTINGS } from '@/src/data';
import { cn } from '@/src/lib/utils';

export default function AdminSettings() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [activeTab, setActiveTab] = useState<'General' | 'Contact' | 'Policy'>('General');
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1500);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-[#2D2D2D]">Business Settings</h1>
          <p className="text-gray-500">Configure your store information and global policies.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#FB7701] text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-2 shadow-lg hover:bg-[#e66c00] transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>SAVE CHANGES</span>
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 flex flex-row lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 overflow-x-auto pb-4 lg:pb-0">
          {[
            { id: 'General', icon: Store },
            { id: 'Contact', icon: Phone },
            { id: 'Policy', icon: ShieldCheck }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all flex-shrink-0",
                activeTab === tab.id 
                  ? "bg-[#2D2D2D] text-white shadow-lg" 
                  : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100"
              )}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.id}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow">
          {activeTab === 'General' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-10"
            >
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#2D2D2D] flex items-center">
                  <Store className="w-6 h-6 mr-3 text-[#FB7701]" /> Store Identity
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Business Name</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none font-bold"
                      value={settings.businessName}
                      onChange={(e) => setSettings({...settings, businessName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Store Logo Text</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none font-bold"
                      value={settings.businessName}
                      readOnly
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Short Description</label>
                  <textarea 
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none transition-all resize-none"
                    value={settings.description}
                    onChange={(e) => setSettings({...settings, description: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <div className="space-y-6 pt-10 border-t border-gray-50">
                <h3 className="text-xl font-bold text-[#2D2D2D] flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-[#FB7701]" /> Security
                </h3>
                <div className="bg-gray-50 p-6 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#2D2D2D]">Admin Password</p>
                    <p className="text-xs text-gray-500">Keep your dashboard access secure by rotating passwords.</p>
                  </div>
                  <button 
                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                    className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold hover:border-[#FB7701] transition-all"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Contact' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-10"
            >
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-[#2D2D2D] flex items-center">
                  <Phone className="w-6 h-6 mr-3 text-[#FB7701]" /> Public Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none"
                      value={settings.phone}
                      onChange={(e) => setSettings({...settings, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">WhatsApp Number</label>
                    <input 
                      type="tel" 
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none"
                      value={settings.whatsappNumber}
                      onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Public Business Email</label>
                    <input 
                      type="email" 
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none"
                      value={settings.email}
                      onChange={(e) => setSettings({...settings, email: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Business Address</label>
                    <textarea 
                      rows={2}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none transition-all resize-none"
                      value={settings.address}
                      onChange={(e) => setSettings({...settings, address: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-10 border-t border-gray-50">
                <h3 className="text-xl font-bold text-[#2D2D2D] flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-[#FB7701]" /> Business Hours
                </h3>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Opening Hours</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none"
                    value={settings.businessHours}
                    onChange={(e) => setSettings({...settings, businessHours: e.target.value})}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Policy' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-10"
            >
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-[#2D2D2D] flex items-center">
                  <ShieldCheck className="w-6 h-6 mr-3 text-[#FB7701]" /> Vision & Mission
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Company Vision</label>
                    <textarea 
                      rows={3}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none transition-all resize-none"
                      value={settings.vision}
                      onChange={(e) => setSettings({...settings, vision: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Company Mission</label>
                    <textarea 
                      rows={3}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none transition-all resize-none"
                      value={settings.mission}
                      onChange={(e) => setSettings({...settings, mission: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-10 border-t border-gray-50">
                <h3 className="text-xl font-bold text-[#2D2D2D] flex items-center">
                  <RotateCcw className="w-6 h-6 mr-3 text-[#FB7701]" /> Shipping & Returns
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Default Delivery Fee (₦)</label>
                    <input 
                      type="number" 
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none focus:ring-1 focus:ring-[#FB7701] outline-none font-bold"
                      value={settings.deliveryFee}
                      onChange={(e) => setSettings({...settings, deliveryFee: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// Reuse icon for security section
const Lock = ShieldCheck;
