'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

const DEMO_PRODUCTS = [
  { id: 'p1', name: 'Glass Beads Mix (50pcs)', category: 'Beads', price: 450, originalPrice: 500, stock: 25, isBestSeller: true, isActive: true, salesCount: 89, images: [] },
  { id: 'p2', name: 'Crystal AB Beads (100pcs)', category: 'Beads', price: 750, stock: 35, isBestSeller: true, isActive: true, salesCount: 67, images: [] },
  { id: 'p3', name: 'Silk Threads Set (10pcs)', category: 'Strings & Threads', price: 850, stock: 12, isActive: true, salesCount: 54, images: [] },
  { id: 'p4', name: 'Metal Charms Mix (20pcs)', category: 'Charms & Pendants', price: 550, stock: 30, isActive: true, salesCount: 48, images: [] },
  { id: 'p5', name: 'Gold Jump Rings (100pcs)', category: 'Hooks & Findings', price: 380, stock: 45, isBestSeller: true, isActive: true, salesCount: 43, images: [] },
  { id: 'p6', name: 'Butterfly Decorations (12pcs)', category: 'Butterfly Embellishments', price: 320, originalPrice: 400, stock: 8, isNew: true, isActive: true, salesCount: 31, images: [] },
  { id: 'p7', name: 'Elastic String 1mm (10m)', category: 'Strings & Threads', price: 250, stock: 50, isActive: true, salesCount: 28, images: [] },
  { id: 'p8', name: 'Pearl Beads Set (30pcs)', category: 'Beads', price: 620, stock: 3, isNew: true, isActive: true, salesCount: 22, images: [] },
];

export default function FeaturedProducts({ title = 'Best Sellers', filter = 'bestSeller' }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = filter === 'bestSeller' ? 'bestSeller=true' : filter === 'new' ? 'isNew=true' : 'featured=true';
    fetch(`/api/products?${params}&limit=8`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.products?.length) setProducts(data.products);
        else setProducts(DEMO_PRODUCTS);
      })
      .catch(() => setProducts(DEMO_PRODUCTS))
      .finally(() => setLoading(false));
  }, [filter]);

  const filterLink = filter === 'bestSeller' ? '/shop?bestSeller=true' : filter === 'new' ? '/shop?isNew=true' : '/shop';

  return (
    <section className="section-gap">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-eyebrow">Handpicked for You</p>
            <h2 className="section-title">{title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link href={filterLink} className="view-all-link">
              View all products <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="product-grid">
            {Array.from({length: 4}).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-gray-100 animate-pulse" style={{ height: '300px' }} />
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id || product._id} product={{ ...product, id: product.id || product._id }} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
