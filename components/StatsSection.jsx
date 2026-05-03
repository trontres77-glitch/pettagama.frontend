'use client';
import { useEffect, useRef, useState } from 'react';

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { icon: '👥', label: 'Happy Customers', value: 5000, suffix: '+', color: '#E11D48' },
  { icon: '📦', label: 'Quality Products', value: 1000, suffix: '+', color: '#2563EB' },
  { icon: '⭐', label: 'Positive Feedback', value: 98, suffix: '%', color: '#7C3AED' },
  { icon: '⏰', label: 'Customer Support', value: 24, suffix: '/7', color: '#059669' },
];

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="max-w-7xl mx-auto px-4">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={s.label} className="stat-card group">
              <div className="stat-icon" style={{ background: `${s.color}20`, border: `1px solid ${s.color}30` }}>
                <span className="text-2xl">{s.icon}</span>
              </div>
              <p className="stat-number" style={{ color: s.color }}>
                <CountUp target={s.value} suffix={s.suffix} />
              </p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
