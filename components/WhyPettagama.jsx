'use client';
export default function WhyPettagama() {
  const points = [
    { icon: '🏆', title: 'Curated Quality', desc: 'Only the best for your creative projects' },
    { icon: '🌍', title: 'Creative Community', desc: 'Join thousands of makers & creators' },
    { icon: '💡', title: 'Inspiration Everyday', desc: 'Ideas, tutorials & craft guides' },
    { icon: '❤️', title: 'Trusted by Creators', desc: 'Loved by hobbyists & professionals' },
  ];
  return (
    <section className="why-section">
      <div className="max-w-7xl mx-auto px-4">
        <div className="why-inner">
          <div className="why-text">
            <p className="section-eyebrow" style={{ color: '#FB7185' }}>Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Your Creative Journey Starts With the Right{' '}
              <span className="craft-italic-light">Materials</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Pettagama.lk was born from a passion for creativity and the joy of handmade. We believe that every creative vision deserves the right materials.
            </p>
            <div className="space-y-3">
              {points.map(p => (
                <div key={p.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                    style={{ background: 'rgba(255,255,255,0.1)' }}>
                    {p.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{p.title}</p>
                    <p className="text-white/50 text-xs">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="why-visual">
            <div className="crafted-badge">
              <span className="text-2xl">❤️</span>
              <span className="text-xs font-bold text-white mt-1">Crafted with</span>
              <span className="text-xs text-white/70">for Creators</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
