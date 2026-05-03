'use client';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <section className="newsletter-section">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 text-white/80"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
          Join Our Community
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
          Stay Inspired, Stay Creative
        </h2>
        <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
          Get new ideas, exclusive offers & craft tips straight to your inbox.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white"
            style={{ background: 'rgba(5,150,105,0.3)', border: '1px solid rgba(5,150,105,0.5)' }}>
            <span className="text-2xl">🎉</span>
            <div className="text-left">
              <p className="font-bold">You're subscribed!</p>
              <p className="text-xs text-white/70">Check your inbox for your 10% off coupon</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="newsletter-input flex-1"
            />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        )}

        <div className="flex items-center justify-center gap-2 mt-5 text-white/40 text-xs">
          <span>🎁</span>
          <span>Get <strong className="text-white/70">10% off</strong> your first order when you subscribe</span>
        </div>
      </div>
    </section>
  );
}
