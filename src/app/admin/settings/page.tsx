"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Store,
  Palette,
  Truck,
  CreditCard,
  Bell,
  Shield,
  Sliders,
  History,
  Camera,
  Upload,
  ChevronRight,
  Check,
  Eye,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

const TABS = [
  { id: "general", label: "General" },
  { id: "store", label: "Store" },
  { id: "branding", label: "Branding" },
  { id: "shipping", label: "Shipping" },
  { id: "payments", label: "Payments" },
  { id: "tax", label: "Tax" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "system", label: "System" },
];

export default function SettingsPage() {
  const [activeSubTab, setActiveSubTab] = useState("general");
  const [showToast, setShowToast] = useState(false);

  // Profile State
  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@elevara.com",
    phone: "+91 98765 43210",
    role: "Super Admin",
  });

  // Store Settings State
  const [store, setStore] = useState({
    name: "Elevāra Fragrances",
    email: "support@elevara.com",
    phone: "+91 98765 43210",
    address: "123, Luxury Street, Mumbai, Maharashtra, India",
  });

  // Branding State
  const [branding, setBranding] = useState({
    primaryColor: "#D4A017",
    secondaryColor: "#0F0F11",
  });

  // Shipping State
  const [shipping, setShipping] = useState({
    freeShipping: true,
    freeShippingThreshold: "1999.00",
    standardShipping: "99.00",
    expressShipping: "199.00",
    regions: "All Regions Selected (5)",
  });

  // Payment State
  const [payments, setPayments] = useState({
    stripe: true,
    razorpay: true,
    cod: true,
    currency: "INR (₹) - Indian Rupee",
    taxType: "Exclusive of Tax",
  });

  // Notification State
  const [notifications, setNotifications] = useState({
    order: true,
    stock: true,
    review: true,
    customer: false,
  });

  // System State
  const [system, setSystem] = useState({
    language: "English",
    timezone: "(GMT+05:30) Asia/Kolkata",
    dateFormat: "DD MMM YYYY",
    timeFormat: "12 Hour (AM/PM)",
    dashboard: "Analytics Dashboard",
  });

  const triggerSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-8 pb-10 relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-24 left-1/2 z-50 rounded-xl border border-primary/30 bg-[#0a0810]/95 backdrop-blur-md px-6 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-3"
          >
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Configuration Updated Successfully</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs Header */}
      <div className="flex border-b border-white/[0.05] overflow-x-auto gap-8 custom-scrollbar">
        {TABS.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center pb-4 relative text-[11px] font-bold uppercase tracking-widest transition-all shrink-0 ${
                isActive ? "text-primary font-bold" : "text-white/40 hover:text-white"
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="settings-active-line"
                  className="absolute bottom-0 inset-x-0 h-0.5 bg-primary"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 3x3 Grid Layout of all operational settings panels */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        
        {/* Panel 1: Admin Profile */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-primary/70">
                   <User size={16} />
                </div>
                <div>
                   <h3 className="text-xs font-bold text-white uppercase tracking-wider">Admin Profile</h3>
                   <p className="text-[9px] text-white/30 font-medium">Manage your personal information and account details.</p>
                </div>
             </div>

             <div className="flex items-center gap-6 py-2">
                <div className="h-16 w-16 rounded-full bg-black/40 overflow-hidden border border-white/[0.1] shrink-0 relative group">
                   <img src="/assets/product.jpeg" className="w-full h-full object-cover opacity-80" />
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                      <Camera size={14} className="text-white/80" />
                   </div>
                </div>
                <div className="space-y-1">
                   <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white/60 hover:bg-white/[0.05]">
                      <Upload size={12} />
                      Change Photo
                   </button>
                   <p className="text-[8px] text-white/20">JPG, PNG up to 2MB</p>
                </div>
             </div>

             <div className="space-y-3">
                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Full Name</label>
                   <input 
                     type="text" 
                     value={profile.name}
                     onChange={(e) => setProfile({...profile, name: e.target.value})}
                     className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none focus:border-primary/40" 
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Email Address</label>
                   <input 
                     type="email" 
                     value={profile.email}
                     onChange={(e) => setProfile({...profile, email: e.target.value})}
                     className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none focus:border-primary/40" 
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Phone Number</label>
                   <input 
                     type="text" 
                     value={profile.phone}
                     onChange={(e) => setProfile({...profile, phone: e.target.value})}
                     className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none focus:border-primary/40" 
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Role</label>
                   <select 
                     value={profile.role}
                     onChange={(e) => setProfile({...profile, role: e.target.value})}
                     className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white/60 focus:outline-none"
                   >
                     <option>Super Admin</option>
                     <option>Editor</option>
                     <option>Moderator</option>
                   </select>
                </div>
             </div>
          </div>
          <button 
            onClick={triggerSave}
            className="w-full rounded-xl bg-primary py-2 text-[9px] font-bold uppercase tracking-wider text-[#050308] hover:bg-primary/95 transition-all self-end"
          >
            Update Profile
          </button>
        </div>

        {/* Panel 2: Store Settings */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-primary/70">
                   <Store size={16} />
                </div>
                <div>
                   <h3 className="text-xs font-bold text-white uppercase tracking-wider">Store Settings</h3>
                   <p className="text-[9px] text-white/30 font-medium">Update your store information and contact details.</p>
                </div>
             </div>

             <div className="space-y-3">
                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Store Name</label>
                   <input 
                     type="text" 
                     value={store.name}
                     onChange={(e) => setStore({...store, name: e.target.value})}
                     className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none focus:border-primary/40" 
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Support Email</label>
                   <input 
                     type="email" 
                     value={store.email}
                     onChange={(e) => setStore({...store, email: e.target.value})}
                     className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none focus:border-primary/40" 
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Support Phone</label>
                   <input 
                     type="text" 
                     value={store.phone}
                     onChange={(e) => setStore({...store, phone: e.target.value})}
                     className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none focus:border-primary/40" 
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Business Address</label>
                   <textarea 
                     value={store.address}
                     onChange={(e) => setStore({...store, address: e.target.value})}
                     className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none focus:border-primary/40 h-20 resize-none" 
                   />
                </div>
             </div>
          </div>
          <button 
            onClick={triggerSave}
            className="w-full rounded-xl bg-primary py-2 text-[9px] font-bold uppercase tracking-wider text-[#050308] hover:bg-primary/95 transition-all"
          >
            Save Changes
          </button>
        </div>

        {/* Panel 3: Branding Settings */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-primary/70">
                   <Palette size={16} />
                </div>
                <div>
                   <h3 className="text-xs font-bold text-white uppercase tracking-wider">Branding Settings</h3>
                   <p className="text-[9px] text-white/30 font-medium">Customize your store branding and visual identity.</p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Store Logo</label>
                   <div className="border border-white/[0.05] bg-white/[0.02] rounded-xl p-4 flex flex-col items-center justify-center h-24">
                      <span className="text-[10px] font-serif tracking-[0.2em] uppercase text-primary">ELEVĀRA</span>
                      <span className="text-[6px] tracking-[0.3em] uppercase text-white/30 mt-0.5">FRAGRANCES</span>
                   </div>
                   <button className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.05] bg-white/[0.02] px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white/60 hover:bg-white/[0.05]">
                      <Upload size={10} />
                      Upload Logo
                   </button>
                   <p className="text-[6px] text-white/20 text-center">PNG, JPG up to 2MB</p>
                </div>

                <div className="space-y-2">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Favicon</label>
                   <div className="border border-white/[0.05] bg-white/[0.02] rounded-xl flex items-center justify-center h-24">
                      <span className="text-xl font-serif text-primary">E</span>
                   </div>
                   <button className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.05] bg-white/[0.02] px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white/60 hover:bg-white/[0.05]">
                      <Upload size={10} />
                      Upload Favicon
                   </button>
                   <p className="text-[6px] text-white/20 text-center">ICO, PNG up to 1MB</p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Primary Color</label>
                   <div className="flex gap-2 items-center bg-white/[0.02] border border-white/[0.05] rounded-xl px-2 py-1">
                      <div className="h-4 w-4 rounded-sm border border-white/10 shrink-0" style={{ backgroundColor: branding.primaryColor }} />
                      <input 
                        type="text" 
                        value={branding.primaryColor}
                        onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                        className="w-full bg-transparent border-none text-[10px] text-white focus:outline-none uppercase font-mono" 
                      />
                   </div>
                </div>
                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Secondary Color</label>
                   <div className="flex gap-2 items-center bg-white/[0.02] border border-white/[0.05] rounded-xl px-2 py-1">
                      <div className="h-4 w-4 rounded-sm border border-white/10 shrink-0" style={{ backgroundColor: branding.secondaryColor }} />
                      <input 
                        type="text" 
                        value={branding.secondaryColor}
                        onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})}
                        className="w-full bg-transparent border-none text-[10px] text-white focus:outline-none uppercase font-mono" 
                      />
                   </div>
                </div>
             </div>
          </div>
          <button 
            onClick={triggerSave}
            className="w-full rounded-xl bg-primary py-2 text-[9px] font-bold uppercase tracking-wider text-[#050308] hover:bg-primary/95 transition-all"
          >
            Save Changes
          </button>
        </div>

        {/* Panel 4: Shipping Settings */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-primary/70">
                   <Truck size={16} />
                </div>
                <div>
                   <h3 className="text-xs font-bold text-white uppercase tracking-wider">Shipping Settings</h3>
                   <p className="text-[9px] text-white/30 font-medium">Configure shipping methods and delivery options.</p>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-semibold text-white">Free Shipping</p>
                      <p className="text-[8px] text-white/30">Enable free shipping</p>
                   </div>
                   <button 
                     onClick={() => setShipping({...shipping, freeShipping: !shipping.freeShipping})}
                     className={`w-9 h-5 rounded-full relative flex items-center px-0.5 transition-colors ${shipping.freeShipping ? 'bg-primary' : 'bg-white/10'}`}
                   >
                     <motion.div 
                       layout
                       className="h-4.5 w-4.5 rounded-full bg-[#050308]"
                       animate={{ x: shipping.freeShipping ? 16 : 0 }}
                     />
                   </button>
                </div>

                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Free Shipping Threshold</label>
                   <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-white/30">₹</span>
                      <input 
                        type="text" 
                        value={shipping.freeShippingThreshold}
                        onChange={(e) => setShipping({...shipping, freeShippingThreshold: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-6 pr-3 py-2 text-[10px] text-white focus:outline-none focus:border-primary/40" 
                      />
                   </div>
                </div>

                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Standard Shipping Charge</label>
                   <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-white/30">₹</span>
                      <input 
                        type="text" 
                        value={shipping.standardShipping}
                        onChange={(e) => setShipping({...shipping, standardShipping: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-6 pr-3 py-2 text-[10px] text-white focus:outline-none focus:border-primary/40" 
                      />
                   </div>
                </div>

                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Express Shipping Charge</label>
                   <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-white/30">₹</span>
                      <input 
                        type="text" 
                        value={shipping.expressShipping}
                        onChange={(e) => setShipping({...shipping, expressShipping: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-6 pr-3 py-2 text-[10px] text-white focus:outline-none focus:border-primary/40" 
                      />
                   </div>
                </div>

                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Delivery Regions</label>
                   <select 
                     value={shipping.regions}
                     onChange={(e) => setShipping({...shipping, regions: e.target.value})}
                     className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white/60 focus:outline-none"
                   >
                     <option>All Regions Selected (5)</option>
                     <option>Domestic Only</option>
                     <option>International Only</option>
                   </select>
                </div>
             </div>
          </div>
          <button 
            onClick={triggerSave}
            className="w-full rounded-xl bg-primary py-2 text-[9px] font-bold uppercase tracking-wider text-[#050308] hover:bg-primary/95 transition-all"
          >
            Save Changes
          </button>
        </div>

        {/* Panel 5: Payment Settings */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-primary/70">
                   <CreditCard size={16} />
                </div>
                <div>
                   <h3 className="text-xs font-bold text-white uppercase tracking-wider">Payment Settings</h3>
                   <p className="text-[9px] text-white/30 font-medium">Manage payment gateways and payment options.</p>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-semibold text-white">Stripe</p>
                      <p className="text-[8px] text-white/30">Accept payments via Stripe</p>
                   </div>
                   <button 
                     onClick={() => setPayments({...payments, stripe: !payments.stripe})}
                     className={`w-9 h-5 rounded-full relative flex items-center px-0.5 transition-colors ${payments.stripe ? 'bg-primary' : 'bg-white/10'}`}
                   >
                     <motion.div 
                       layout
                       className="h-4.5 w-4.5 rounded-full bg-[#050308]"
                       animate={{ x: payments.stripe ? 16 : 0 }}
                     />
                   </button>
                </div>

                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-semibold text-white">Razorpay</p>
                      <p className="text-[8px] text-white/30">Accept payments via Razorpay</p>
                   </div>
                   <button 
                     onClick={() => setPayments({...payments, razorpay: !payments.razorpay})}
                     className={`w-9 h-5 rounded-full relative flex items-center px-0.5 transition-colors ${payments.razorpay ? 'bg-primary' : 'bg-white/10'}`}
                   >
                     <motion.div 
                       layout
                       className="h-4.5 w-4.5 rounded-full bg-[#050308]"
                       animate={{ x: payments.razorpay ? 16 : 0 }}
                     />
                   </button>
                </div>

                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-semibold text-white">Cash on Delivery (COD)</p>
                      <p className="text-[8px] text-white/30">Enable Cash on Delivery</p>
                   </div>
                   <button 
                     onClick={() => setPayments({...payments, cod: !payments.cod})}
                     className={`w-9 h-5 rounded-full relative flex items-center px-0.5 transition-colors ${payments.cod ? 'bg-primary' : 'bg-white/10'}`}
                   >
                     <motion.div 
                       layout
                       className="h-4.5 w-4.5 rounded-full bg-[#050308]"
                       animate={{ x: payments.cod ? 16 : 0 }}
                     />
                   </button>
                </div>

                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Currency</label>
                   <select 
                     value={payments.currency}
                     onChange={(e) => setPayments({...payments, currency: e.target.value})}
                     className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white/60 focus:outline-none"
                   >
                     <option>INR (₹) - Indian Rupee</option>
                     <option>USD ($) - US Dollar</option>
                     <option>EUR (€) - Euro</option>
                   </select>
                </div>

                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Tax Selection</label>
                   <select 
                     value={payments.taxType}
                     onChange={(e) => setPayments({...payments, taxType: e.target.value})}
                     className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white/60 focus:outline-none"
                   >
                     <option>Exclusive of Tax</option>
                     <option>Inclusive of Tax</option>
                   </select>
                </div>
             </div>
          </div>
          <button 
            onClick={triggerSave}
            className="w-full rounded-xl bg-primary py-2 text-[9px] font-bold uppercase tracking-wider text-[#050308] hover:bg-primary/95 transition-all"
          >
            Save Changes
          </button>
        </div>

        {/* Panel 6: Notification Settings */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-primary/70">
                   <Bell size={16} />
                </div>
                <div>
                   <h3 className="text-xs font-bold text-white uppercase tracking-wider">Notification Settings</h3>
                   <p className="text-[9px] text-white/30 font-medium">Configure email and system notification preferences.</p>
                </div>
             </div>

             <div className="space-y-4 pt-2">
                {[
                  { id: "order", label: "Order Notifications", desc: "Receive notifications for new orders" },
                  { id: "stock", label: "Stock Alerts", desc: "Get notified for low stock products" },
                  { id: "review", label: "Review Alerts", desc: "Get notified for new reviews" },
                  { id: "customer", label: "Customer Notifications", desc: "Receive customer sign up alerts" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                     <div>
                        <p className="text-[10px] font-semibold text-white">{item.label}</p>
                        <p className="text-[8px] text-white/30">{item.desc}</p>
                     </div>
                     <button 
                       onClick={() => setNotifications({...notifications, [item.id]: !notifications[item.id as keyof typeof notifications]})}
                       className={`w-9 h-5 rounded-full relative flex items-center px-0.5 transition-colors ${notifications[item.id as keyof typeof notifications] ? 'bg-primary' : 'bg-white/10'}`}
                     >
                       <motion.div 
                         layout
                         className="h-4.5 w-4.5 rounded-full bg-[#050308]"
                         animate={{ x: notifications[item.id as keyof typeof notifications] ? 16 : 0 }}
                       />
                     </button>
                  </div>
                ))}
             </div>
          </div>
          <button 
            onClick={triggerSave}
            className="w-full rounded-xl bg-primary py-2 text-[9px] font-bold uppercase tracking-wider text-[#050308] hover:bg-primary/95 transition-all"
          >
            Save Changes
          </button>
        </div>

        {/* Panel 7: Security Settings */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-primary/70">
                   <Shield size={16} />
                </div>
                <div>
                   <h3 className="text-xs font-bold text-white uppercase tracking-wider">Security Settings</h3>
                   <p className="text-[9px] text-white/30 font-medium">Manage password, sessions and security preferences.</p>
                </div>
             </div>

             <div className="space-y-1 divide-y divide-white/[0.03] pt-2">
                <div className="flex items-center justify-between py-3.5 cursor-pointer group hover:bg-white/[0.01] px-1 rounded-lg transition-colors">
                   <div>
                      <p className="text-[10px] font-semibold text-white tracking-wide">Change Password</p>
                      <p className="text-[8px] text-white/30">Update your account password</p>
                   </div>
                   <ChevronRight size={14} className="text-white/20 group-hover:text-primary transition-colors" />
                </div>

                <div className="flex items-center justify-between py-3.5 cursor-pointer group hover:bg-white/[0.01] px-1 rounded-lg transition-colors">
                   <div>
                      <p className="text-[10px] font-semibold text-white tracking-wide">Two-Factor Authentication</p>
                      <p className="text-[8px] text-white/30">Add extra security to your account</p>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-[8px] font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded-sm">Disabled</span>
                      <ChevronRight size={14} className="text-white/20 group-hover:text-primary transition-colors" />
                   </div>
                </div>

                <div className="flex items-center justify-between py-3.5 cursor-pointer group hover:bg-white/[0.01] px-1 rounded-lg transition-colors">
                   <div>
                      <p className="text-[10px] font-semibold text-white tracking-wide">Active Sessions</p>
                      <p className="text-[8px] text-white/30">Manage your active login sessions</p>
                   </div>
                   <ChevronRight size={14} className="text-white/20 group-hover:text-primary transition-colors" />
                </div>
             </div>
          </div>
          <div className="h-[34px]" /> {/* Empty space to align the bottom buttons perfectly */}
        </div>

        {/* Panel 8: System Preferences */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-primary/70">
                   <Sliders size={16} />
                </div>
                <div>
                   <h3 className="text-xs font-bold text-white uppercase tracking-wider">System Preferences</h3>
                   <p className="text-[9px] text-white/30 font-medium">Configure system preferences and localization.</p>
                </div>
             </div>

             <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Language</label>
                      <select 
                        value={system.language}
                        onChange={(e) => setSystem({...system, language: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white/60 focus:outline-none"
                      >
                        <option>English</option>
                        <option>Español</option>
                        <option>Français</option>
                      </select>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Timezone</label>
                      <select 
                        value={system.timezone}
                        onChange={(e) => setSystem({...system, timezone: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white/60 focus:outline-none"
                      >
                        <option>(GMT+05:30) Asia/Kolkata</option>
                        <option>(GMT+00:00) UTC</option>
                        <option>(GMT-05:00) EST</option>
                      </select>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Date Format</label>
                      <select 
                        value={system.dateFormat}
                        onChange={(e) => setSystem({...system, dateFormat: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white/60 focus:outline-none"
                      >
                        <option>DD MMM YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Time Format</label>
                      <select 
                        value={system.timeFormat}
                        onChange={(e) => setSystem({...system, timeFormat: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white/60 focus:outline-none"
                      >
                        <option>12 Hour (AM/PM)</option>
                        <option>24 Hour</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Default Dashboard</label>
                   <select 
                     value={system.dashboard}
                     onChange={(e) => setSystem({...system, dashboard: e.target.value})}
                     className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white/60 focus:outline-none"
                   >
                     <option>Analytics Dashboard</option>
                     <option>Products Control</option>
                     <option>Orders Control</option>
                   </select>
                </div>
             </div>
          </div>
          <button 
            onClick={triggerSave}
            className="w-full rounded-xl bg-primary py-2 text-[9px] font-bold uppercase tracking-wider text-[#050308] hover:bg-primary/95 transition-all"
          >
            Save Changes
          </button>
        </div>

        {/* Panel 9: Activity Log */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-primary/70">
                   <History size={16} />
                </div>
                <div>
                   <h3 className="text-xs font-bold text-white uppercase tracking-wider">Activity Log</h3>
                   <p className="text-[9px] text-white/30 font-medium">Recent activities performed in your account.</p>
                </div>
             </div>

             <div className="space-y-3.5 pt-2">
                {[
                  { text: "Admin updated store settings", time: "May 29, 2024 10:30 AM", type: "gold" },
                  { text: "New order #ORD-1025 received", time: "May 29, 2024 10:15 AM", type: "gold" },
                  { text: "Product \"Oud Noir\" stock updated", time: "May 29, 2024 09:45 AM", type: "gold" },
                  { text: "Admin logged in", time: "May 29, 2024 09:30 AM", type: "gold" },
                  { text: "Review published for \"Amber Majesty\"", time: "May 29, 2024 09:10 AM", type: "red" },
                ].map((log, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                     <div className={`h-1.5 w-1.5 rounded-full mt-1 shrink-0 ${log.type === 'gold' ? 'bg-primary shadow-[0_0_6px_#d4a017]' : 'bg-rose-500 shadow-[0_0_6px_#f43f5e]'}`} />
                     <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-white/80 leading-snug truncate">{log.text}</p>
                        <p className="text-[8px] text-white/30 font-bold mt-0.5">{log.time}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
          <button 
            className="w-full rounded-xl border border-white/[0.05] hover:bg-white/[0.02] hover:border-primary/20 transition-all py-2 text-[9px] font-bold uppercase tracking-wider text-white/60 hover:text-primary"
          >
            View All Logs
          </button>
        </div>

      </div>

    </div>
  );
}
