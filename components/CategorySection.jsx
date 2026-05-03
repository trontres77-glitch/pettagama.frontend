'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';

const CATEGORIES = [
  { name: 'Beads', count: '300+ Items', emoji: '⚪', href: '/shop?category=Beads', theme: 'blue' },
  { name: 'Strings & Threads', count: '200+ Items', emoji: '🧵', href: '/shop?category=Strings+%26+Threads', theme: 'red' },
  { name: 'Charms & Pendants', count: '300+ Items', emoji: '🔮', href: '/shop?category=Charms+%26+Pendants', theme: 'blue' },
  { name: 'Butterflies & Embellishments', count: '200+ Items', emoji: '🦋', href: '/shop?category=Butterfly+Embellishments', theme: 'red' },
  { name: 'Hooks & Findings', count: '180+ Items', emoji: '🔗', href: '/shop?category=Hooks+%26+Findings', theme: 'blue' },
];

const BLUE_GRAD = 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 60%, #60A5FA 100%)';
const RED_GRAD = 'linear-gradient(135deg, #E11D48 0%, #F43F5E 50%, #FB7185 100%)';

export default function CategorySection() {
  const [liked, setLiked] = useState({});

  return (
    <section className="section-gap">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-eyebrow">Browse by Type</p>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <Link href="/categories" className="view-all-link">
            View all categories <ArrowRight size={14} />
          </Link>
        </div>

        {/* Category grid — 5 columns, perfect 1:1 squares */}
        <div className="category-grid">
          {CATEGORIES.map((cat, i) => (
            <Link key={cat.name} href={cat.href}>
              <div className="category-card-square group" style={{ background: cat.theme === 'blue' ? BLUE_GRAD : RED_GRAD }}>
                {/* Overlay glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: cat.theme === 'blue'
                    ? 'radial-gradient(circle at 50% 50%, rgba(96,165,250,0.3), transparent 70%)'
                    : 'radial-gradient(circle at 50% 50%, rgba(251,113,133,0.3), transparent 70%)' }} />

                {/* Central emoji / icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 group-hover:scale-110 transition-transform">{cat.emoji}</span>
                </div>

                {/* Wishlist */}
                <button
                  onClick={e => { e.preventDefault(); setLiked(l => ({ ...l, [cat.name]: !l[cat.name] })); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors z-10">
                  <Heart size={14} className={`transition-colors ${liked[cat.name] ? 'text-red-300 fill-red-300' : 'text-white'}`} />
                </button>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white font-bold text-sm leading-tight drop-shadow-sm">{cat.name}</p>
                      <p className="text-white/70 text-xs">{cat.count}</p>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors flex-shrink-0">
                      <ArrowRight size={13} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
