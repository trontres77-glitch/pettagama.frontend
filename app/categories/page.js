'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CartProvider } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartPanel from '@/components/CartPanel';
import { ArrowRight, Heart } from 'lucide-react';

const CATS = [
  { name:'Beads', count:'300+ Items', emoji:'⚪', desc:'Glass, crystal, pearl, seed & more', href:'/shop?category=Beads', theme:'blue' },
  { name:'Strings & Threads', count:'200+ Items', emoji:'🧵', desc:'Silk, nylon, elastic & wire', href:'/shop?category=Strings+%26+Threads', theme:'red' },
  { name:'Charms & Pendants', count:'300+ Items', emoji:'🔮', desc:'Metal, resin & novelty charms', href:'/shop?category=Charms+%26+Pendants', theme:'blue' },
  { name:'Butterfly Embellishments', count:'200+ Items', emoji:'🦋', desc:'Fabric, metal & sparkle butterflies', href:'/shop?category=Butterfly+Embellishments', theme:'red' },
  { name:'Hooks & Findings', count:'180+ Items', emoji:'🔗', desc:'Clasps, rings, ear wires & more', href:'/shop?category=Hooks+%26+Findings', theme:'blue' },
  { name:'Resin Art', count:'90+ Items', emoji:'🎨', desc:'Molds, pigments & tools', href:'/shop?category=Resin+Art', theme:'red' },
  { name:'Slippers Items', count:'70+ Items', emoji:'👡', desc:'Decorations & accessories', href:'/shop?category=Slippers+Items', theme:'blue' },
  { name:'Other', count:'150+ Items', emoji:'✨', desc:'Tools, kits & accessories', href:'/shop?category=Other', theme:'red' },
];

const BLUE='linear-gradient(135deg,#1E3A8A,#2563EB)';
const RED='linear-gradient(135deg,#E11D48,#F43F5E)';

export default function CategoriesPage() {
  const [cartOpen,setCartOpen]=useState(false);
  const [liked,setLiked]=useState({});
  return(
    <CartProvider>
      <Navbar onCartOpen={()=>setCartOpen(true)}/>
      <div className="py-10 px-4" style={{background:'linear-gradient(135deg,#0F172A,#1E3A8A)'}}>
        <div className="max-w-7xl mx-auto">
          <p className="text-white/50 text-xs mb-1">Home → Categories</p>
          <h1 className="text-3xl font-black text-white" style={{fontFamily:'var(--font-playfair)'}}>Shop by Category</h1>
          <p className="text-white/60 text-sm mt-1">Browse our full collection of craft materials</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="category-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
          {CATS.map((c,i)=>(
            <Link key={c.name} href={c.href}>
              <div className="category-card-square group" style={{background:c.theme==='blue'?BLUE:RED}}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{background:'rgba(255,255,255,0.08)'}}/>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl opacity-20 group-hover:opacity-30 transition-opacity">{c.emoji}</span>
                </div>
                <button onClick={e=>{e.preventDefault();setLiked(l=>({...l,[c.name]:!l[c.name]}))}}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center z-10">
                  <Heart size={14} className={liked[c.name]?'text-red-300 fill-red-300':'text-white'}/>
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-bold text-sm">{c.name}</p>
                  <p className="text-white/60 text-xs">{c.count}</p>
                  <p className="text-white/50 text-xs mt-0.5">{c.desc}</p>
                </div>
                <div className="absolute bottom-3 right-3 w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight size={13} className="text-white"/>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer/>
      <CartPanel isOpen={cartOpen} onClose={()=>setCartOpen(false)}/>
    </CartProvider>
  );
}
