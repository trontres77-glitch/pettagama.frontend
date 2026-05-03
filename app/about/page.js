'use client';
import { useState } from 'react';
import { CartProvider } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartPanel from '@/components/CartPanel';
import StatsSection from '@/components/StatsSection';

export default function AboutPage() {
  const [cartOpen,setCartOpen]=useState(false);
  return(
    <CartProvider>
      <Navbar onCartOpen={()=>setCartOpen(true)}/>
      <div className="relative py-16 px-4 overflow-hidden" style={{background:'linear-gradient(135deg,#0F172A,#1E3A8A)'}}>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="section-eyebrow" style={{color:'#FB7185'}}>Our Story</p>
          <h1 className="text-4xl font-black text-white mt-2" style={{fontFamily:'var(--font-playfair)'}}>About Pettagama.lk</h1>
          <p className="text-white/60 text-base mt-3 max-w-lg mx-auto">
            Born from a passion for creativity and the joy of handmade — bringing premium craft materials to every creator in Sri Lanka.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="section-eyebrow">Who We Are</p>
            <h2 className="text-3xl font-black text-gray-900 mb-4" style={{fontFamily:'var(--font-playfair)'}}>Our Creative Journey</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Pettagama.lk was born from a passion for creativity and the joy of handmade. We believe that every creative person in Sri Lanka deserves access to premium quality craft materials at fair prices.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Based in Colombo, we serve passionate crafters, small business owners, and hobbyists across the island with carefully curated materials and personalised service.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{aspectRatio:'4/3',background:'url(/images/why-2.png) center/cover'}}>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {icon:'🏆',title:'Quality First',desc:'Every product is carefully selected for quality and craftsmanship. We only sell what we would use ourselves.'},
            {icon:'🚚',title:'Island-wide Delivery',desc:'We deliver to every corner of Sri Lanka, fast and reliably, with tracking on every order.'},
            {icon:'💬',title:'Personal Service',desc:'Order via WhatsApp for a personal, friendly shopping experience. We reply within minutes.'},
          ].map(v=>(
            <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="text-4xl mb-3">{v.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="rounded-2xl p-10 text-center" style={{background:'linear-gradient(135deg,#0F172A,#1E3A8A)'}}>
          <p className="text-xl font-semibold text-white leading-relaxed" style={{fontFamily:'var(--font-playfair)'}}>
            "Everything you need to create something beautiful — that's our promise to every crafter in Sri Lanka."
          </p>
          <p className="text-white/50 mt-3 text-sm">— The Pettagama.lk Team</p>
        </div>
      </div>

      <StatsSection/>
      <Footer/>
      <CartPanel isOpen={cartOpen} onClose={()=>setCartOpen(false)}/>
    </CartProvider>
  );
}
