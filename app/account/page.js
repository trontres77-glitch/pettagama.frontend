'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CartProvider } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartPanel from '@/components/CartPanel';

export default function AccountPage() {
  const [cartOpen,setCartOpen]=useState(false);
  const [tab,setTab]=useState('login');
  const [form,setForm]=useState({name:'',email:'',password:'',phone:''});
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [loggedIn,setLoggedIn]=useState(false);

  const submit=async e=>{
    e.preventDefault(); setLoading(true); setError('');
    try {
      const res=await fetch(tab==='login'?'/api/auth/login':'/api/auth/register',{
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify(form),
      });
      const data=await res.json();
      if(res.ok){localStorage.setItem('user_token',data.token);localStorage.setItem('user',JSON.stringify(data.user));setLoggedIn(true);}
      else setError(data.error||'Something went wrong');
    } catch { setError('Connection error. Please try again.'); }
    setLoading(false);
  };

  return(
    <CartProvider>
      <Navbar onCartOpen={()=>setCartOpen(true)}/>
      <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-50">
        {loggedIn?(
          <div className="bg-white rounded-3xl p-10 text-center max-w-sm w-full shadow-sm border border-gray-100">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold"
              style={{background:'linear-gradient(135deg,#E11D48,#BE123C)'}}>
              {form.name?.[0]?.toUpperCase()||form.email?.[0]?.toUpperCase()||'U'}
            </div>
            <h2 className="text-xl font-black text-gray-800 mb-1" style={{fontFamily:'var(--font-playfair)'}}>Welcome back!</h2>
            <p className="text-gray-500 text-sm mb-6">{form.email}</p>
            <Link href="/shop"><button className="btn-primary w-full justify-center mb-3">Browse Shop</button></Link>
            <button onClick={()=>{setLoggedIn(false);setForm({name:'',email:'',password:'',phone:''});}} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Sign out</button>
          </div>
        ):(
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-black text-gray-900" style={{fontFamily:'var(--font-playfair)'}}>
                {tab==='login'?'Welcome Back':'Create Account'}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{tab==='login'?'Sign in to your Pettagama account':'Join thousands of crafters in Sri Lanka'}</p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
                {['login','register'].map(t=>(
                  <button key={t} onClick={()=>{setTab(t);setError('');}}
                    className={`flex-1 py-2.5 text-sm font-semibold transition-all capitalize ${tab===t?'text-white':'text-gray-500 hover:text-gray-700'}`}
                    style={tab===t?{background:'linear-gradient(135deg,#1E3A8A,#2563EB)'}:{}}>
                    {t==='login'?'Sign In':'Register'}
                  </button>
                ))}
              </div>
              {error&&<div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-4">{error}</div>}
              <form onSubmit={submit} className="space-y-4">
                {tab==='register'&&(
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Full Name</label>
                    <input type="text" required value={form.name} placeholder="Amara Silva"
                      onChange={e=>setForm({...form,name:e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-blue-400 transition-colors"/>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Email</label>
                  <input type="email" required value={form.email} placeholder="amara@example.com"
                    onChange={e=>setForm({...form,email:e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-blue-400 transition-colors"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Password</label>
                  <input type="password" required value={form.password} placeholder="••••••••"
                    onChange={e=>setForm({...form,password:e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-blue-400 transition-colors"/>
                </div>
                <button type="submit" disabled={loading} className="w-full btn-primary justify-center">
                  {loading?'Please wait...':(tab==='login'?'Sign In':'Create Account')}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer/>
      <CartPanel isOpen={cartOpen} onClose={()=>setCartOpen(false)}/>
    </CartProvider>
  );
}
