'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';

const BUNDLES = [
  { id:'b1', name:'Jewelry Starter Kit', desc:'Everything you need', price:1950, emoji:'💍', items:['Beads','Threads','Charms','Hooks'] },
  { id:'b2', name:'Gift Wrapping Set', desc:'Make every gift special', price:1250, emoji:'🎁', items:['Ribbons','Beads','Butterflies'] },
  { id:'b3', name:'Beading Essentials Kit', desc:'Perfect for beginners', price:1750, emoji:'🔵', items:['Glass Beads','Threads','Needles'] },
  { id:'b4', name:'Decor Creation Kit', desc:'Decorate with style', price:2250, emoji:'✨', items:['Butterflies','Pendants','Wire'] },
];

export default function BundlesSection() {
  const { dispatch } = useCart();
  return (
    <section className="section-gap">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-eyebrow">Save More</p>
            <h2 className="section-title">Complete Your Craft</h2>
          </div>
          <Link href="/shop" className="view-all-link">View all bundles <ArrowRight size={14} /></Link>
        </div>
        <div className="bundles-grid">
          {BUNDLES.map(b => (
            <div key={b.id} className="bundle-card group">
              <div className="bundle-emoji">{b.emoji}</div>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-800 mb-0.5">{b.name}</p>
                <p className="text-xs text-gray-400 mb-2">{b.desc}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {b.items.map(item => (
                    <span key={item} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">{item}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-black text-base" style={{ color: '#1E3A8A' }}>LKR {b.price.toLocaleString()}</span>
                  <button
                    onClick={() => dispatch({ type: 'ADD_ITEM', item: { id: b.id, name: b.name, price: b.price, category: 'Bundle', images: [] } })}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1 transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #E11D48, #BE123C)' }}>
                    Buy Bundle <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
