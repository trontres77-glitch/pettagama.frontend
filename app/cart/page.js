'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CartProvider, useCart } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartPanel from '@/components/CartPanel';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

function CartContent() {
  const { items, total, dispatch } = useCart();
  const FREE_THRESHOLD = 5000;
  const progress = Math.min(100,(total/FREE_THRESHOLD)*100);
  const remaining = Math.max(0,FREE_THRESHOLD-total);

  if (!items.length) return (
    <div className="min-h-96 flex flex-col items-center justify-center gap-4 py-20">
      <ShoppingBag size={48} className="text-gray-200"/>
      <p className="text-gray-500">Your cart is empty</p>
      <Link href="/shop"><button className="btn-primary">Browse Shop</button></Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-black text-gray-900 mb-6" style={{fontFamily:'var(--font-playfair)'}}>Your Cart ({items.length})</h1>
          {items.map(item=>(
            <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-gray-100">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                <img src={item.images?.[0]||''} alt={item.name} className="w-full h-full object-cover"
                  onError={e=>{e.target.parentElement.innerHTML='<div class="w-full h-full flex items-center justify-center text-2xl">🔵</div>';}}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                <p className="text-xs text-gray-400 mb-3">{item.category}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={()=>dispatch({type:'UPDATE_QTY',id:item.id,qty:item.qty-1})}
                      className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Minus size={12}/>
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                    <button onClick={()=>dispatch({type:'UPDATE_QTY',id:item.id,qty:item.qty+1})}
                      className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Plus size={12}/>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm" style={{color:'#E11D48'}}>LKR {(item.price*item.qty).toLocaleString()}</span>
                    <button onClick={()=>dispatch({type:'REMOVE_ITEM',id:item.id})} className="text-gray-300 hover:text-red-400 transition-colors">
                      <Trash2 size={15}/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          {remaining > 0 && (
            <div className="bg-blue-50 rounded-2xl p-4">
              <p className="text-sm text-blue-700 font-medium mb-2">Add LKR {remaining.toLocaleString()} for free delivery!</p>
              <div className="h-2 bg-blue-200 rounded-full"><div className="h-full rounded-full transition-all" style={{width:`${progress}%`,background:'linear-gradient(90deg,#1E3A8A,#E11D48)'}}/></div>
            </div>
          )}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4" style={{fontFamily:'var(--font-playfair)'}}>Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-semibold">LKR {total.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Delivery</span><span className={total>=FREE_THRESHOLD?'text-green-600 font-semibold':'text-gray-700'}>{total>=FREE_THRESHOLD?'FREE':'Calculated at checkout'}</span></div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-black text-lg" style={{color:'#1E3A8A',fontFamily:'var(--font-playfair)'}}>LKR {total.toLocaleString()}</span>
              </div>
            </div>
            <Link href="/checkout">
              <button className="w-full btn-primary justify-center mt-4">
                Proceed to Checkout <ArrowRight size={16}/>
              </button>
            </Link>
            <Link href="/shop">
              <button className="w-full mt-3 py-3 text-sm text-gray-500 hover:text-gray-700 transition-colors">← Continue Shopping</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const [cartOpen,setCartOpen]=useState(false);
  return(
    <CartProvider>
      <Navbar onCartOpen={()=>setCartOpen(true)}/>
      <CartContent/>
      <Footer/>
      <CartPanel isOpen={cartOpen} onClose={()=>setCartOpen(false)}/>
    </CartProvider>
  );
}
