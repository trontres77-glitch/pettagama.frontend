'use client';
import { useState } from 'react';
import { CartProvider } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartPanel from '@/components/CartPanel';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [cartOpen,setCartOpen]=useState(false);
  const [form,setForm]=useState({name:'',email:'',subject:'',message:''});
  const [sent,setSent]=useState(false);
  const submit=e=>{e.preventDefault();setSent(true);};
  return(
    <CartProvider>
      <Navbar onCartOpen={()=>setCartOpen(true)}/>
      <div className="py-10 px-4" style={{background:'linear-gradient(135deg,#0F172A,#1E3A8A)'}}>
        <div className="max-w-7xl mx-auto">
          <p className="text-white/50 text-xs mb-1">Home → Contact</p>
          <h1 className="text-3xl font-black text-white" style={{fontFamily:'var(--font-playfair)'}}>We're Here to Help</h1>
          <p className="text-white/60 text-sm mt-1">Have questions or need assistance? Reach out to us anytime.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6" style={{fontFamily:'var(--font-playfair)'}}>Send a Message</h2>
            {sent ? (
              <div className="text-center py-10">
                <p className="text-4xl mb-3">✅</p>
                <h3 className="font-bold text-gray-800 mb-1">Message Sent!</h3>
                <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
                <button onClick={()=>setSent(false)} className="mt-4 btn-primary text-sm">Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                {[{label:'Your Name',key:'name',type:'text',ph:'John Silva'},{label:'Email Address',key:'email',type:'email',ph:'john@example.com'},{label:'Subject',key:'subject',type:'text',ph:'Order enquiry...'}].map(f=>(
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">{f.label}</label>
                    <input type={f.type} required value={form[f.key]} placeholder={f.ph}
                      onChange={e=>setForm({...form,[f.key]:e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-blue-400 transition-colors"/>
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Message</label>
                  <textarea required rows={4} value={form.message} placeholder="How can we help you?"
                    onChange={e=>setForm({...form,message:e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-blue-400 transition-colors resize-none"/>
                </div>
                <button type="submit" className="w-full btn-primary justify-center">
                  <Send size={15}/> Send Message
                </button>
              </form>
            )}
          </div>
          {/* Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-3">
                {[{icon:Phone,label:'+94 71 2 345 678'},{icon:Mail,label:'info@pettagama.lk'},{icon:MapPin,label:'No. 123, Main Street, Colombo 10, Sri Lanka'},{icon:Clock,label:'Mon–Sat 9AM–6PM | Sun 10AM–5PM'}].map((c,i)=>(
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{background:'rgba(30,58,138,0.08)'}}>
                      <c.icon size={16} style={{color:'#1E3A8A'}}/>
                    </div>
                    <p className="text-sm text-gray-600 mt-1.5">{c.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <a href="https://wa.me/94712345678"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl text-white font-semibold"
              style={{background:'linear-gradient(135deg,#25D366,#128C7E)'}}>
              <span className="text-2xl">💬</span>
              <div>
                <p className="font-bold">Chat on WhatsApp</p>
                <p className="text-xs text-white/75">Fastest way to reach us</p>
              </div>
            </a>
            <div className="bg-gray-200 rounded-2xl overflow-hidden" style={{height:'200px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div className="text-center text-gray-500">
                <MapPin size={32} className="mx-auto mb-2 opacity-40"/>
                <p className="text-sm">Map — Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      <CartPanel isOpen={cartOpen} onClose={()=>setCartOpen(false)}/>
    </CartProvider>
  );
}
