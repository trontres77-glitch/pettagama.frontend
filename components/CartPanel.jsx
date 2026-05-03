'use client';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';
import Link from 'next/link';

export default function CartPanel({ isOpen, onClose }) {
  const { items, total, dispatch } = useCart();
  const FREE_THRESHOLD = 5000;
  const remaining = Math.max(0, FREE_THRESHOLD - total);
  const progress = Math.min(100, (total / FREE_THRESHOLD) * 100);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={onClose} />
      )}
      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm shadow-2xl transition-transform duration-400 ease-out flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: '#fff' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} style={{ color: '#E11D48' }} />
            <h2 className="font-bold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
              Your Cart {items.length > 0 && <span className="text-gray-400 font-normal text-sm">({items.length})</span>}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Free delivery progress */}
        {total > 0 && (
          <div className="px-5 py-3 bg-blue-50 border-b border-blue-100">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-blue-700 font-medium">
                {remaining > 0 ? `Add LKR ${remaining.toLocaleString()} more for free delivery!` : '🎉 You qualify for free delivery!'}
              </span>
            </div>
            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #1E3A8A, #E11D48)' }} />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
              <div className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(225,29,72,0.08)' }}>
                <ShoppingCart size={32} className="text-gray-300" />
              </div>
              <p className="text-gray-500 text-center">Your cart is empty.<br />Start adding some craft materials!</p>
              <button onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
                style={{ background: 'linear-gradient(135deg, #E11D48, #BE123C)' }}>
                Browse Shop
              </button>
            </div>
          ) : items.map(item => (
            <div key={item.id} className="flex gap-3 bg-gray-50 rounded-2xl p-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white">
                <img src={item.images?.[0] || '/images/placeholder.jpg'} alt={item.name}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.src = '/images/placeholder.jpg'; }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-xs text-gray-400 mb-2">{item.category}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })}
                      className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <Minus size={11} />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold">{item.qty}</span>
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })}
                      className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <Plus size={11} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold" style={{ color: '#E11D48' }}>
                      LKR {(item.price * item.qty).toLocaleString()}
                    </span>
                    <button onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
                      className="p-1 hover:text-red-500 text-gray-300 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="font-bold text-gray-800">LKR {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Delivery</span>
              <span className={`text-sm font-semibold ${total >= FREE_THRESHOLD ? 'text-green-600' : 'text-gray-800'}`}>
                {total >= FREE_THRESHOLD ? 'FREE' : 'Calculated at checkout'}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="font-bold text-gray-800">Total</span>
              <span className="text-xl font-black" style={{ color: '#1E3A8A', fontFamily: 'var(--font-playfair)' }}>
                LKR {total.toLocaleString()}
              </span>
            </div>
            <Link href="/checkout" onClick={onClose}>
              <button className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #E11D48, #BE123C)' }}>
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            </Link>
            <button onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
