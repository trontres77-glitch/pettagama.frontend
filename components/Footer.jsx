'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-main">
      {/* Bead string decoration */}
      <div className="bead-string" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="bead" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex flex-col mb-4">
              <span className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
                Pettagama<span style={{ color: '#E11D48' }}>.lk</span>
              </span>
              <span className="text-xs text-gray-400 tracking-widest uppercase mt-0.5">Everything for Arts & Crafts</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-5">
              Your trusted online store for premium craft materials. Serving passionate crafters across Sri Lanka with quality beads, threads, butterfly embellishments and more.
            </p>
            <div className="flex items-center gap-3">
              {['f', 'ig', 'tt', 'yt'].map((s, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white/70 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="footer-heading">Shop</h4>
            <ul className="space-y-2">
              {['All Materials','Categories','New Arrivals','Best Sellers','Craft Worlds','Bundles','Bulk Orders'].map(l => (
                <li key={l}><Link href="/shop" className="footer-link">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="space-y-2">
              {[['About Us','/about'],['Our Story','/about'],['Careers','#'],['Blog','#'],['Track Order','#'],['Sustainability','#']].map(([l, h]) => (
                <li key={l}><Link href={h} className="footer-link">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="footer-heading">Help & Support</h4>
            <ul className="space-y-2">
              {[['Help Center','/contact'],['Shipping & Delivery','#'],['Returns & Refunds','#'],['Track Order','#'],['FAQs','#'],['Contact Us','/contact']].map(([l, h]) => (
                <li key={l}><Link href={h} className="footer-link">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Customer care + payments */}
        <div className="grid md:grid-cols-2 gap-6 py-8 border-t border-white/10">
          <div>
            <h4 className="footer-heading mb-3">Customer Care</h4>
            <div className="space-y-1.5 text-sm text-gray-400">
              <p>📞 +94 71 2 345 678</p>
              <p>✉️ info@pettagama.lk</p>
              <p>📍 No. 123, Main Street, Colombo 10, Sri Lanka</p>
              <p>🕐 Mon–Sat: 9:00 AM – 6:00 PM</p>
              <p>🕐 Sunday: 10:00 AM – 5:00 PM</p>
            </div>
          </div>
          <div>
            <h4 className="footer-heading mb-3">We Accept</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {['VISA','MC','AMEX','iPay'].map(p => (
                <span key={p} className="px-3 py-1.5 rounded-lg text-xs font-bold text-gray-300"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  {p}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>🔒</span>
              <span>100% Secure Payments</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10 text-xs text-gray-500">
          <p>© 2024 Pettagama.lk. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
