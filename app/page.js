'use client';
import { useState } from 'react';
import { CartProvider } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import CraftWorlds from '@/components/CraftWorlds';
import CategorySection from '@/components/CategorySection';
import TrendingSection from '@/components/TrendingSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import InspirationGallery from '@/components/InspirationGallery';
import WhyPettagama from '@/components/WhyPettagama';
import BundlesSection from '@/components/BundlesSection';
import StatsSection from '@/components/StatsSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import CartPanel from '@/components/CartPanel';

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <CartProvider>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <Hero />
      <TrustBadges />
      <CraftWorlds />
      <CategorySection />
      <TrendingSection />
      <FeaturedProducts title="Best Sellers" filter="bestSeller" />
      <InspirationGallery />
      <WhyPettagama />
      <BundlesSection />
      <StatsSection />
      <NewsletterSection />
      <Footer />
      <CartPanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94771234567'}`}
        target="_blank" rel="noopener noreferrer" className="whatsapp-float" title="Chat with us on WhatsApp">
        💬
      </a>
    </CartProvider>
  );
}
