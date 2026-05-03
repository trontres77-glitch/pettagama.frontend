'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const WORLDS = [
  { name: 'Beading Studio', count: '120+ items', emoji: '🔵', href: '/shop?category=Beads',
    grad: 'linear-gradient(135deg, #1E3A8A, #7C3AED)' },
  { name: 'DIY Jewelry', count: '150+ items', emoji: '💍', href: '/shop?category=Charms+%26+Pendants',
    grad: 'linear-gradient(135deg, #E11D48, #F43F5E)' },
  { name: 'Gift Making', count: '90+ items', emoji: '🎁', href: '/shop',
    grad: 'linear-gradient(135deg, #1E3A8A, #2563EB)' },
  { name: 'Event Decorations', count: '110+ items', emoji: '✨', href: '/shop',
    grad: 'linear-gradient(135deg, #E11D48, #9333EA)' },
  { name: 'Kids Craft Kits', count: '80+ items', emoji: '🎨', href: '/shop',
    grad: 'linear-gradient(135deg, #1E3A8A, #059669)' },
];

export default function CraftWorlds() {
  return (
    <section className="section-gap">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-eyebrow">Themed Collections</p>
            <h2 className="section-title">Explore Craft Worlds</h2>
          </div>
          <Link href="/craft-worlds" className="view-all-link">
            View all worlds <ArrowRight size={14} />
          </Link>
        </div>

        <div className="craft-worlds-grid">
          {WORLDS.map((w, i) => (
            <Link key={w.name} href={w.href}>
              <div className="craft-world-card group" style={{ background: w.grad }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="relative z-10 h-full flex flex-col justify-between p-4">
                  <div className="text-4xl opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-300">
                    {w.emoji}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-tight">{w.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-white/60 text-xs">{w.count}</p>
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <ArrowRight size={11} className="text-white" />
                      </div>
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
