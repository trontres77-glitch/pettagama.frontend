'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CartProvider, useCart } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import { Lock, CheckCircle, ArrowRight } from 'lucide-react';

function CheckoutContent() {
  const { items, total, dispatch } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:'', phone:'', email:'', address:'', city:'', notes:'' });
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/orders', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          customerName:form.name, customerPhone:form.phone, customerEmail:form.email,
          address:`${form.address}, ${form.city}`, notes:form.notes,
          items: items.map(i=>({name:i.name,price:i.price,quantity:i.qty,image:i.images?.[0]||''})),
          totalPrice:total,
        }),
      });
    } catch {}
    dispatch({type:'CLEAR'});
    setPlaced(true);
    setLoading(false);
  };

  if (placed) return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{background:'linear-gradient(135deg,#0F172A,#1E3A8A)'}}>
      <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-500"/>
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2" style={{fontFamily:'var(--font-playfair)'}}>Order Placed!</h2>
        <p className="text-gray-500 text-sm mb-6">Thank you! We'll contact you on WhatsApp to confirm your order.</p>
        <Link href="/"><button className="btn-primary w-full justify-center">Back to Home</button></Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 px-4" style={{background:'linear-gradient(135deg,#0F172A,#1E3A8A)'}}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-black text-white" style={{fontFamily:'var(--font-playfair)'}}>Checkout</h1>
          <div className="flex items-center gap-3 mt-3">
            {['Shipping','Review','Place Order'].map((s,i)=>(
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step>i+1?'bg-green-500 text-white':step===i+1?'bg-white text-gray-900':'bg-white/20 text-white/50'}`}>{step>i+1?'✓':i+1}</div>
                <span className={`text-xs font-medium ${step===i+1?'text-white':'text-white/50'}`}>{s}</span>
                {i<2&&<span className="text-white/30 text-xs">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={submit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h2 className="font-bold text-gray-800 mb-2">Shipping Details</h2>
              {[{label:'Full Name',key:'name',type:'text',ph:'Amara Silva'},{label:'Phone Number',key:'phone',type:'tel',ph:'+94 77 XXX XXXX'},{label:'Email (optional)',key:'email',type:'email',ph:'amara@example.com'},{label:'Street Address',key:'address',type:'text',ph:'123 Main Street'},{label:'City',key:'city',type:'text',ph:'Colombo'}].map(f=>(
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">{f.label}</label>
                  <input type={f.type} value={form[f.key]} placeholder={f.ph}
                    required={f.key!=='email'}
                    onChange={e=>setForm({...form,[f.key]:e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-blue-400 transition-colors"/>
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Notes (optional)</label>
                <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={2}
                  placeholder="Any special instructions..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm resize-none focus:border-blue-400 transition-colors"/>
              </div>
              <button type="submit" disabled={loading||!items.length}
                className="w-full btn-primary justify-center">
                <Lock size={15}/> {loading?'Placing Order...':'Place Order — LKR '+total.toLocaleString()}
              </button>
              <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                <Lock size={11}/> Secure checkout. We'll confirm via WhatsApp.
              </p>
            </form>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-fit">
            <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {items.map(i=>(
                <div key={i.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate flex-1 pr-2">{i.name} ×{i.qty}</span>
                  <span className="font-semibold flex-shrink-0">LKR {(i.price*i.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-black" style={{color:'#1E3A8A'}}>LKR {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return <CartProvider><Navbar onCartOpen={()=>{}}/><CheckoutContent/></CartProvider>;
}
