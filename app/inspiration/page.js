'use client';
import { useState } from 'react';
import { CartProvider } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartPanel from '@/components/CartPanel';
import InspirationGallery from '@/components/InspirationGallery';
import NewsletterSection from '@/components/NewsletterSection';

export default function InspirationPage() {
  const [cartOpen,setCartOpen]=useState(false);
  return(
    <CartProvider>
      <Navbar onCartOpen={()=>setCartOpen(true)}/>
      <div className="py-10 px-4" style={{background:'linear-gradient(135deg,#0F172A,#1E3A8A)'}}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/50 text-xs mb-1 uppercase tracking-widest">Creative Ideas</p>
          <h1 className="text-3xl font-black text-white" style={{fontFamily:'var(--font-playfair)'}}>Get Inspired</h1>
          <p className="text-white/60 text-sm mt-2">Tutorials, ideas and craft projects for every skill level</p>
        </div>
      </div>
      <div className="py-4">
        <InspirationGallery/>
      </div>
      <NewsletterSection/>
      <Footer/>
      <CartPanel isOpen={cartOpen} onClose={()=>setCartOpen(false)}/>
    </CartProvider>
  );
}
