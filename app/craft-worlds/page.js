'use client';
import { useState } from 'react';
import { CartProvider } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartPanel from '@/components/CartPanel';
import CraftWorlds from '@/components/CraftWorlds';
import FeaturedProducts from '@/components/FeaturedProducts';

export default function CraftWorldsPage() {
  const [cartOpen,setCartOpen]=useState(false);
  return(
    <CartProvider>
      <Navbar onCartOpen={()=>setCartOpen(true)}/>
      <div className="py-10 px-4" style={{background:'linear-gradient(135deg,#0F172A,#7C3AED)'}}>
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold text-white/80 mb-3"
            style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.15)'}}>
            ✨ New Feature
          </span>
          <h1 className="text-3xl font-black text-white" style={{fontFamily:'var(--font-playfair)'}}>Craft Worlds</h1>
          <p className="text-white/60 text-sm mt-2">Curated themed collections for every creative style</p>
        </div>
      </div>
      <div className="py-4"><CraftWorlds/></div>
      <FeaturedProducts title="Top Picks Across Worlds" filter="featured"/>
      <Footer/>
      <CartPanel isOpen={cartOpen} onClose={()=>setCartOpen(false)}/>
    </CartProvider>
  );
}
