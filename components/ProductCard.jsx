'use client';
import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from './CartContext';

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const [adding, setAdding] = useState(false);
  const { dispatch } = useCart();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAdd = e => {
    e.preventDefault();
    setAdding(true);
    dispatch({ type: 'ADD_ITEM', item: product });
    setTimeout(() => setAdding(false), 700);
  };

  return (
    <div className="product-card group">
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ height: '200px', background: '#f8f9ff' }}>
        <img
          src={product.images?.[0] || '/images/glass-beads-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
          onError={e => { e.target.src = '/images/glass-beads-product.jpg'; }}
        />
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {discount && (
            <span className="badge-sale">-{discount}%</span>
          )}
          {product.isNew && !discount && (
            <span className="badge-new">New</span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart size={15} className={liked ? 'text-red-500 fill-red-500' : 'text-gray-300'} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <p className="text-xs text-gray-400 font-medium mb-1">{product.category}</p>
        <h3 className="font-semibold text-sm text-gray-800 leading-snug mb-2.5 line-clamp-2">{product.name}</h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-extrabold text-base" style={{ color: '#e11d48' }}>
            LKR {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">LKR {product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          disabled={product.stock === 0 || adding}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
          style={{
            background: product.stock === 0
              ? '#d1d5db'
              : adding
              ? '#059669'
              : '#1a2442',
          }}
        >
          <ShoppingCart size={15} className={adding ? 'animate-bounce' : ''}/>
          {adding ? 'Added ✓' : product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
