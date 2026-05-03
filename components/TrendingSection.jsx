'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const TRENDING = [
  { name: 'Summer Craft Collection', label: 'New', href: '/shop', emoji: '☀️', color: '#E11D48' },
  { name: 'Festival Decor Essentials', label: 'Hot', href: '/shop', emoji: '🎊', color: '#7C3AED' },
  { name: 'Butterfly Magic Collection', label: 'New', href: '/shop', emoji: '🦋', color: '#E11D48' },
  { name: 'Pastel Beads New Arrivals', label: 'New', href: '/shop', emoji: '🎨', color: '#2563EB' },
  { name: 'Handmade Gift Ideas', label: 'Popular', href: '/shop', emoji: '🎁', color: '#059669' },
];

export default function TrendingSection() {
  return (
    <section className="section-gap">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-eyebrow">What's Hot Right Now</p>
            <h2 className="section-title">Trending This Season</h2>
          </div>
          <Link href="/shop" className="view-all-link">View more <ArrowRight size={14} /></Link>
        </div>
        <div className="trending-grid">
          {TRENDING.map((t, i) => (
            <Link key={t.name} href={t.href}>
              <div className="trending-card group">
                <div className="trending-img" style={{ background: `linear-gradient(135deg, ${t.color}22, ${t.color}44)` }}>
                  <span className="text-4xl">{t.emoji}</span>
                </div>
                <div className="trending-badge" style={{ background: t.color }}>{t.label}</div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-700 leading-tight line-clamp-2">{t.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-gray-400">Shop now</span>
                    <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background: t.color }}>
                      <ArrowRight size={10} className="text-white" />
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
