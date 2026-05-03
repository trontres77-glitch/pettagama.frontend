'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, Package } from 'lucide-react';
import { useCart } from './CartContext';

export default function Navbar({ onCartOpen }) {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop Materials', href: '/shop', hasDropdown: true },
    { label: 'Categories', href: '/categories', hasDropdown: true },
    { label: 'Craft Worlds', href: '/craft-worlds', badge: 'New' },
    { label: 'Bulk Orders', href: '/bulk' },
    { label: 'Inspiration', href: '/inspiration' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs">
          <span>🚚 Free delivery on orders over LKR 5,000 &nbsp;|&nbsp; 🇱🇰 Islandwide Delivery</span>
          <div className="hidden sm:flex items-center gap-4">
            <a href="/contact" className="hover:text-white/80 transition-colors">Help Center</a>
            <a href="/orders" className="hover:text-white/80 transition-colors">Track Order</a>
            <div className="flex items-center gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">f</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">ig</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">tt</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`navbar-main sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex flex-col leading-none">
                <span className="navbar-logo">Pettagama<span className="text-[#E11D48]">.lk</span></span>
                <span className="text-[9px] text-gray-400 tracking-widest uppercase">Everything for Arts & Crafts</span>
              </div>
            </Link>

            {/* Search — desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search raw materials, tools, kits & more..."
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && searchQ) window.location.href = `/shop?search=${searchQ}`; }}
                  className="navbar-search"
                />
                <button
                  onClick={() => searchQ && (window.location.href = `/shop?search=${searchQ}`)}
                  className="absolute right-0 top-0 h-full px-4 rounded-r-xl flex items-center justify-center transition-colors"
                  style={{ background: 'linear-gradient(135deg, #1E3A8A, #0F172A)' }}
                >
                  <Search size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Mobile search toggle */}
              <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden nav-icon-btn">
                <Search size={20} />
              </button>
              <Link href="/account" className="nav-icon-btn hidden sm:flex">
                <User size={20} />
                <span className="hidden lg:block text-xs font-medium">Login / Register</span>
              </Link>
              <button className="nav-icon-btn hidden sm:flex">
                <Heart size={20} />
              </button>
              <button onClick={onCartOpen} className="nav-icon-btn relative">
                <ShoppingCart size={20} />
                {count > 0 && (
                  <span className="cart-badge">{count > 99 ? '99+' : count}</span>
                )}
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden nav-icon-btn ml-1">
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          {searchOpen && (
            <div className="md:hidden pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  autoFocus
                  className="navbar-search"
                />
                <button onClick={() => searchQ && (window.location.href = `/shop?search=${searchQ}`)}
                  className="absolute right-0 top-0 h-full px-4" style={{ background: '#1E3A8A', borderRadius: '0 10px 10px 0' }}>
                  <Search size={15} className="text-white" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:block border-t border-white/5" style={{ background: 'rgba(15,23,42,0.98)' }}>
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 h-10">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all relative group"
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #E11D48, #9333EA)' }}>
                    {link.badge}
                  </span>
                )}
                {link.hasDropdown && <ChevronDown size={11} className="opacity-60" />}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="absolute top-0 left-0 bottom-0 w-72 shadow-2xl overflow-y-auto"
            style={{ background: 'linear-gradient(180deg, #0F172A, #1E3A8A)' }}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-white font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>Pettagama.lk</span>
              <button onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all">
                  {link.label}
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                      style={{ background: '#E11D48' }}>{link.badge}</span>
                  )}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-white/10 space-y-2">
              <Link href="/account" onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/80 hover:bg-white/10 transition-all">
                <User size={18} /> My Account
              </Link>
              <button onClick={() => { setMenuOpen(false); onCartOpen(); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/80 hover:bg-white/10 transition-all w-full">
                <ShoppingCart size={18} /> Cart {count > 0 && <span className="ml-auto cart-badge">{count}</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
