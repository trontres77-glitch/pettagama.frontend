'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CartProvider } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartPanel from '@/components/CartPanel';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

const CATEGORIES = ['All','Beads','Strings & Threads','Butterfly Embellishments','Charms & Pendants','Hooks & Findings','Resin Art','Slippers Items','Other'];
const DEMO = [
  { id:'p1', name:'Glass Beads Mix (50pcs)', category:'Beads', price:450, originalPrice:500, stock:25, isBestSeller:true, isActive:true, salesCount:89, images:[] },
  { id:'p2', name:'Crystal AB Beads (100pcs)', category:'Beads', price:750, stock:35, isBestSeller:true, isActive:true, salesCount:67, images:[] },
  { id:'p3', name:'Silk Threads Set (10pcs)', category:'Strings & Threads', price:850, stock:12, isActive:true, salesCount:54, images:[] },
  { id:'p4', name:'Metal Charms Mix (20pcs)', category:'Charms & Pendants', price:550, stock:30, isActive:true, salesCount:48, images:[] },
  { id:'p5', name:'Gold Jump Rings (100pcs)', category:'Hooks & Findings', price:380, stock:45, isBestSeller:true, isActive:true, salesCount:43, images:[] },
  { id:'p6', name:'Butterfly Decorations (12pcs)', category:'Butterfly Embellishments', price:320, originalPrice:400, stock:8, isNew:true, isActive:true, salesCount:31, images:[] },
  { id:'p7', name:'Elastic String 1mm (10m)', category:'Strings & Threads', price:250, stock:50, isActive:true, salesCount:28, images:[] },
  { id:'p8', name:'Pearl Beads Set (30pcs)', category:'Beads', price:620, stock:3, isNew:true, isActive:true, salesCount:22, images:[] },
  { id:'p9', name:'Acrylic Beads (200pcs)', category:'Beads', price:380, stock:60, isActive:true, salesCount:19, images:[] },
  { id:'p10', name:'Metal Butterfly Charms (24pcs)', category:'Butterfly Embellishments', price:480, stock:22, isActive:true, salesCount:16, images:[] },
  { id:'p11', name:'Nylon Thread Set (5 colors)', category:'Strings & Threads', price:650, stock:18, isActive:true, salesCount:14, images:[] },
  { id:'p12', name:'Lobster Clasps (50pcs)', category:'Hooks & Findings', price:290, stock:80, isActive:true, salesCount:12, images:[] },
];

function ShopInner() {
  const sp = useSearchParams();
  const [products, setProducts] = useState(DEMO);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState(sp.get('category') || 'All');
  const [search, setSearch] = useState(sp.get('search') || '');
  const [sort, setSort] = useState('popular');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (cat && cat !== 'All') params.set('category', cat);
    if (search) params.set('search', search);
    if (sp.get('bestSeller')) params.set('bestSeller', 'true');
    if (sp.get('isNew')) params.set('isNew', 'true');
    params.set('limit', '24');
    fetch(`/api/products?${params}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.products?.length) setProducts(d.products.map(p=>({...p,id:p.id||p._id}))); else setProducts(DEMO); })
      .catch(() => setProducts(DEMO))
      .finally(() => setLoading(false));
  }, [cat, search]);

  const sorted = [...products].sort((a,b) => sort==='price-asc'?a.price-b.price:sort==='price-desc'?b.price-a.price:sort==='new'?(b.isNew?1:-1):(b.salesCount||0)-(a.salesCount||0));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="py-8 px-4" style={{background:'linear-gradient(135deg,#0F172A,#1E3A8A)'}}>
        <div className="max-w-7xl mx-auto">
          <p className="text-white/50 text-xs mb-1">Home → Shop</p>
          <h1 className="text-2xl font-black text-white" style={{fontFamily:'var(--font-playfair)'}}>
            {cat === 'All' ? 'All Materials' : cat}
          </h1>
          <p className="text-white/60 text-sm mt-1">{sorted.length} products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input type="text" placeholder="Search products..." value={search}
              onChange={e=>setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:border-blue-400 transition-colors"/>
          </div>
          {/* Category chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {CATEGORIES.map(c=>(
              <button key={c} onClick={()=>setCat(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${cat===c?'text-white border-transparent shadow-md':'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                style={cat===c?{background:'linear-gradient(135deg,#1E3A8A,#2563EB)'}:{}}>
                {c}
              </button>
            ))}
          </div>
          {/* Sort */}
          <div className="relative">
            <select value={sort} onChange={e=>setSort(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:border-blue-400 transition-colors cursor-pointer">
              <option value="popular">Popular</option>
              <option value="new">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="product-grid">
            {Array.from({length:8}).map((_,i)=><div key={i} className="skeleton rounded-2xl" style={{height:'300px'}}/>)}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-gray-500">No products found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="product-grid">
            {sorted.map(p=><ProductCard key={p.id} product={p}/>)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [cartOpen,setCartOpen]=useState(false);
  return(
    <CartProvider>
      <Navbar onCartOpen={()=>setCartOpen(true)}/>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="spinner w-10 h-10"/></div>}>
        <ShopInner/>
      </Suspense>
      <Footer/>
      <CartPanel isOpen={cartOpen} onClose={()=>setCartOpen(false)}/>
    </CartProvider>
  );
}
