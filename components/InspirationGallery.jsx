'use client';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

const ITEMS = [
  { title: 'DIY Bracelet Ideas', label: 'Easy & Beautiful', href: '/inspiration', emoji: '💎' },
  { title: 'Festival Decoration', label: 'Step-by-step guide', href: '/inspiration', emoji: '🎊' },
  { title: 'Butterfly Wall Art', label: 'Creative & Elegant', href: '/inspiration', emoji: '🦋' },
  { title: 'Gift Wrapping', label: 'Stylish Ideas', href: '/inspiration', emoji: '🎁' },
  { title: 'Home Decor', label: 'Craft with Love', href: '/inspiration', emoji: '🏡' },
];

const GRADS = [
  'linear-gradient(135deg,#1E3A8A,#7C3AED)',
  'linear-gradient(135deg,#E11D48,#9333EA)',
  'linear-gradient(135deg,#0F172A,#1E3A8A)',
  'linear-gradient(135deg,#9333EA,#E11D48)',
  'linear-gradient(135deg,#1E3A8A,#059669)',
];

export default function InspirationGallery() {
  return (
    <section className="section-gap">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-eyebrow">Creative Ideas</p>
            <h2 className="section-title">Get Inspired</h2>
          </div>
          <Link href="/inspiration" className="view-all-link">
            View all inspiration <ArrowRight size={14} />
          </Link>
        </div>

        <div className="inspiration-grid">
          {ITEMS.map((item, i) => (
            <Link key={item.title} href={item.href}>
              <div className="inspiration-card group" style={{ background: GRADS[i % GRADS.length] }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl opacity-15 group-hover:opacity-25 transition-opacity duration-300">{item.emoji}</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">{item.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{item.label}</p>
                </div>
                <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={12} className="text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
