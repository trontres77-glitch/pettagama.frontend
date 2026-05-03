'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [dot, setDot] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setDot(d => (d + 1) % 3), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero-section">
      {/* Hero image — full bleed, text already in the image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Pettagama.lk — Create. Inspire. Craft."
          className="w-full h-full object-cover"
          onLoad={() => setLoaded(true)}
          onError={e => { e.target.style.display = 'none'; }}
          style={{ transition: 'opacity 0.6s ease', opacity: loaded ? 1 : 0 }}
        />
        {/* Very subtle left gradient to ensure buttons are readable */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(10,18,45,0.55) 0%, rgba(10,18,45,0.3) 40%, transparent 70%)'
        }} />
      </div>

      {/* Hero floating product highlights — right side */}
      <div className="hero-floating-cards">
        <div className="floating-card" style={{ animationDelay: '0s' }}>
          <div className="floating-card-badge trending">Trending</div>
          <p className="floating-card-name">Glass Beads Mix</p>
          <p className="floating-card-price">From LKR 250.00</p>
        </div>
        <div className="floating-card" style={{ animationDelay: '0.3s' }}>
          <div className="floating-card-badge new">New Arrival</div>
          <p className="floating-card-name">Butterfly Decor Set</p>
          <p className="floating-card-price">From LKR 320.00</p>
        </div>
      </div>

      {/* Content — ONLY buttons, no text (text is in image) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col justify-end pb-16 md:pb-20" style={{ minHeight: '580px' }}>
        <div className="max-w-lg">
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/shop">
              <button className="btn-hero-primary">
                Browse Materials <span className="btn-arrow">→</span>
              </button>
            </Link>
            <Link href="/categories">
              <button className="btn-hero-outline">
                Shop Collections <span className="btn-arrow">→</span>
              </button>
            </Link>
            <Link href="/craft-worlds">
              <button className="btn-hero-ghost">
                Explore Craft Worlds →
              </button>
            </Link>
          </div>

          {/* Trending chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/50 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"/>
              Trending now:
            </span>
            {['Butterfly Collection', 'Glass Beads', 'Silk Threads', 'Charms & Pendants'].map(tag => (
              <Link key={tag} href={`/shop?search=${tag}`}>
                <span className="hero-chip">{tag}</span>
              </Link>
            ))}
          </div>

          {/* Slide dots */}
          <div className="flex items-center gap-2 mt-8">
            {[0, 1, 2].map(i => (
              <button key={i} onClick={() => setDot(i)}
                className={`slide-dot ${dot === i ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
