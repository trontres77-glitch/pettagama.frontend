'use client';
export default function TrustBadges() {
  const items = [
    { icon: '💎', label: 'Premium Quality', sub: 'Carefully selected materials' },
    { icon: '🚚', label: 'Islandwide Delivery', sub: 'Fast & reliable shipping' },
    { icon: '🔒', label: 'Secure Payments', sub: '100% safe & secure' },
    { icon: '🎧', label: 'Customer Support', sub: "We're here to help" },
  ];
  return (
    <div className="relative z-10 mx-auto px-4 -mt-6 mb-0" style={{ maxWidth: '1120px' }}>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
        {items.map((b, i) => (
          <div key={b.label} className="flex items-center gap-3 px-5 py-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: 'rgba(225,29,72,0.08)' }}>
              {b.icon}
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800 leading-tight">{b.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{b.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
