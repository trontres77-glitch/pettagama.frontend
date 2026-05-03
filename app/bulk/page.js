'use client';
import { useState } from 'react';
import { CartProvider } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartPanel from '@/components/CartPanel';
import { Package, Phone, Mail, Send } from 'lucide-react';

export default function BulkPage() {
  const [cartOpen,setCartOpen]=useState(false);
  const [form,setForm]=useState({name:'',business:'',phone:'',email:'',products:'',quantity:'',message:''});
  const [sent,setSent]=useState(false);
  return(
    <CartProvider>
      <Navbar onCartOpen={()=>setCartOpen(true)}/>
      <div className="py-12 px-4" style={{background:'linear-gradient(135deg,#0F172A,#1E3A8A)'}}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="section-eyebrow" style={{color:'#FB7185'}}>Wholesale & Trade</p>
          <h1 className="text-3xl font-black text-white mt-1" style={{fontFamily:'var(--font-playfair)'}}>Bulk Orders</h1>
          <p className="text-white/60 text-sm mt-2">Special pricing for businesses, event planners & craft educators</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4" style={{fontFamily:'var(--font-playfair)'}}>Why Bulk With Us?</h2>
          <div className="space-y-4 mb-6">
            {[{icon:'💰',t:'Wholesale Prices',d:'Up to 40% off retail price on orders above LKR 25,000'},{icon:'🚚',t:'Priority Shipping',d:'Dedicated delivery slots for bulk customers'},{icon:'🎨',t:'Custom Packaging',d:'Branded packaging available for resellers'},{icon:'📞',t:'Dedicated Support',d:'Personal account manager for all bulk clients'}].map(b=>(
              <div key={b.t} className="flex gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <span className="text-2xl">{b.icon}</span>
                <div><p className="font-semibold text-gray-800 text-sm">{b.t}</p><p className="text-gray-500 text-xs">{b.d}</p></div>
              </div>
            ))}
          </div>
          <a href="https://wa.me/94712345678" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-2xl text-white font-semibold"
            style={{background:'linear-gradient(135deg,#25D366,#128C7E)'}}>
            <span className="text-2xl">💬</span>
            <div><p className="font-bold">WhatsApp for Instant Quote</p><p className="text-xs text-white/75">Fastest response for bulk queries</p></div>
          </a>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Request a Quote</h3>
          {sent?(
            <div className="text-center py-8">
              <p className="text-3xl mb-2">✅</p>
              <p className="font-bold text-gray-800">Quote Request Sent!</p>
              <p className="text-gray-500 text-sm mt-1">We'll contact you within 4 hours.</p>
            </div>
          ):(
            <form onSubmit={e=>{e.preventDefault();setSent(true);}} className="space-y-3">
              {[{l:'Name',k:'name',t:'text'},{l:'Business Name',k:'business',t:'text'},{l:'Phone',k:'phone',t:'tel'},{l:'Email',k:'email',t:'email'},{l:'Products Needed',k:'products',t:'text'},{l:'Estimated Quantity',k:'quantity',t:'text'}].map(f=>(
                <div key={f.k}>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{f.l}</label>
                  <input type={f.t} required value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-blue-400 transition-colors"/>
                </div>
              ))}
              <button type="submit" className="w-full btn-primary justify-center text-sm">
                <Send size={14}/> Send Quote Request
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer/>
      <CartPanel isOpen={cartOpen} onClose={()=>setCartOpen(false)}/>
    </CartProvider>
  );
}
