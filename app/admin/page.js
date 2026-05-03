'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Settings,
  LogOut, Plus, Edit, Trash2, X, ChevronDown, Search,
  TrendingUp, AlertTriangle, CheckCircle, Clock, Truck,
  BarChart3, Bell, Menu, Eye, RefreshCw, Save, ChevronRight,
  DollarSign, ShoppingCart
} from 'lucide-react';

// ── DEMO DATA ────────────────────────────────────────────────────────────────
const DEMO_STATS = {
  stats: { totalOrders: 142, pendingOrders: 18, totalProducts: 87, lowStockProducts: 5, totalRevenue: 485600 },
  recentOrders: [
    { _id: 'o1', orderNumber: 'PG2401001', customerName: 'Amara Silva', customerPhone: '0771234567', totalPrice: 2450, status: 'pending', createdAt: new Date().toISOString(), items: [{ name: 'Glass Beads Mix', quantity: 2, price: 450 }] },
    { _id: 'o2', orderNumber: 'PG2401002', customerName: 'Nimal Perera', customerPhone: '0769876543', totalPrice: 1850, status: 'confirmed', createdAt: new Date(Date.now() - 86400000).toISOString(), items: [{ name: 'Silk Threads', quantity: 2, price: 850 }] },
    { _id: 'o3', orderNumber: 'PG2401003', customerName: 'Dilani Fernando', customerPhone: '0712345678', totalPrice: 3200, status: 'delivered', createdAt: new Date(Date.now() - 172800000).toISOString(), items: [{ name: 'Crystal Beads', quantity: 4, price: 750 }] },
    { _id: 'o4', orderNumber: 'PG2401004', customerName: 'Kasun Jayawardena', customerPhone: '0768765432', totalPrice: 5600, status: 'shipped', createdAt: new Date(Date.now() - 259200000).toISOString(), items: [{ name: 'Mixed Pack', quantity: 7, price: 800 }] },
    { _id: 'o5', orderNumber: 'PG2401005', customerName: 'Sanduni Rathnayake', customerPhone: '0701234567', totalPrice: 980, status: 'pending', createdAt: new Date(Date.now() - 3600000).toISOString(), items: [{ name: 'Butterfly Set', quantity: 3, price: 320 }] },
  ],
  topProducts: [
    { _id: 'p1', name: 'Glass Beads Mix (50pcs)', category: 'Beads', price: 450, salesCount: 89, stock: 25 },
    { _id: 'p2', name: 'Crystal AB Beads', category: 'Beads', price: 750, salesCount: 67, stock: 35 },
    { _id: 'p3', name: 'Silk Threads Set', category: 'Strings & Threads', price: 850, salesCount: 54, stock: 12 },
    { _id: 'p4', name: 'Metal Charms Mix', category: 'Charms & Pendants', price: 550, salesCount: 48, stock: 30 },
    { _id: 'p5', name: 'Gold Jump Rings', category: 'Hooks & Findings', price: 380, salesCount: 43, stock: 45 },
  ],
};

const DEMO_PRODUCTS = [
  { _id: 'p1', name: 'Glass Beads Mix (50pcs)', category: 'Beads', price: 450, originalPrice: 500, stock: 25, isBestSeller: true, isActive: true, salesCount: 89 },
  { _id: 'p2', name: 'Crystal AB Beads (100pcs)', category: 'Beads', price: 750, stock: 35, isBestSeller: true, isActive: true, salesCount: 67 },
  { _id: 'p3', name: 'Silk Threads Set (10pcs)', category: 'Strings & Threads', price: 850, stock: 12, isActive: true, salesCount: 54 },
  { _id: 'p4', name: 'Metal Charms Mix (20pcs)', category: 'Charms & Pendants', price: 550, stock: 30, isActive: true, salesCount: 48 },
  { _id: 'p5', name: 'Gold Jump Rings (100pcs)', category: 'Hooks & Findings', price: 380, stock: 45, isBestSeller: true, isActive: true, salesCount: 43 },
  { _id: 'p6', name: 'Butterfly Decorations (12pcs)', category: 'Butterfly Embellishments', price: 320, stock: 8, isNew: true, isActive: true, salesCount: 31 },
  { _id: 'p7', name: 'Elastic String 1mm (10m)', category: 'Strings & Threads', price: 250, originalPrice: 300, stock: 50, isActive: true, salesCount: 28 },
  { _id: 'p8', name: 'Pearl Beads Set (30pcs)', category: 'Beads', price: 620, stock: 3, isNew: true, isActive: true, salesCount: 22 },
];

const DEMO_ORDERS = [
  { _id: 'o1', orderNumber: 'PG2401001', customerName: 'Amara Silva', customerPhone: '0771234567', totalPrice: 2450, status: 'pending', createdAt: new Date().toISOString(), items: [{ name: 'Glass Beads Mix', quantity: 2, price: 450 }, { name: 'Silk Threads', quantity: 1, price: 850 }] },
  { _id: 'o2', orderNumber: 'PG2401002', customerName: 'Nimal Perera', customerPhone: '0769876543', totalPrice: 1850, status: 'confirmed', createdAt: new Date(Date.now() - 86400000).toISOString(), items: [{ name: 'Silk Threads', quantity: 2, price: 850 }] },
  { _id: 'o3', orderNumber: 'PG2401003', customerName: 'Dilani Fernando', customerPhone: '0712345678', totalPrice: 3200, status: 'delivered', createdAt: new Date(Date.now() - 172800000).toISOString(), items: [{ name: 'Crystal Beads', quantity: 4, price: 750 }] },
  { _id: 'o4', orderNumber: 'PG2401004', customerName: 'Kasun Jayawardena', customerPhone: '0768765432', totalPrice: 5600, status: 'shipped', createdAt: new Date(Date.now() - 259200000).toISOString(), items: [{ name: 'Mixed Pack', quantity: 7, price: 800 }] },
  { _id: 'o5', orderNumber: 'PG2401005', customerName: 'Sanduni Rathnayake', customerPhone: '0701234567', totalPrice: 980, status: 'pending', createdAt: new Date(Date.now() - 3600000).toISOString(), items: [{ name: 'Butterfly Set', quantity: 3, price: 320 }] },
];

const CATEGORIES = ['Beads', 'Strings & Threads', 'Butterfly Embellishments', 'Charms & Pendants', 'Hooks & Findings', 'Resin Art', 'Slippers Items', 'Other'];

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  processing: 'bg-purple-100 text-purple-800 border-purple-200',
  shipped: 'bg-orange-100 text-orange-800 border-orange-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

// ── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('admin@pettagama.lk');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.user.role === 'admin') {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        onLogin(data.user, data.token);
      } else if (res.ok) {
        setError('Access denied. Admin accounts only.');
      } else {
        
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      // Offline demo mode
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #091D47, #0F2D6B, #3d0011)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #C8102E, #9B0D22)' }}>
            <span className="text-white text-3xl font-bold" style={{ fontFamily: 'serif' }}>P</span>
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>Pettagama.lk</h1>
          <p className="text-blue-200 text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Login card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Sign In</h2>

          {error && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-200 text-sm p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/40 transition-all text-sm"
                placeholder="admin@pettagama.lk"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/40 transition-all text-sm"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg mt-2"
              style={{ background: 'linear-gradient(135deg, #C8102E, #9B0D22)' }}
            >
              {loading ? 'Signing in...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <p className="text-blue-200/60 text-xs text-center mt-4">
            
          </p>
        </div>
      </div>
    </div>
  );
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function Sidebar({ activeTab, onTabChange, user, onLogout, collapsed }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`${collapsed ? 'w-16' : 'w-60'} flex-shrink-0 h-screen sticky top-0 flex flex-col transition-all duration-300`}
      style={{ background: 'linear-gradient(180deg, #091D47 0%, #0F2D6B 100%)' }}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 p-4 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #C8102E, #9B0D22)' }}>
          <span className="text-white font-bold text-lg" style={{ fontFamily: 'serif' }}>P</span>
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-playfair)' }}>Pettagama.lk</p>
            <p className="text-blue-300 text-xs">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === id
                ? 'text-white shadow-lg'
                : 'text-blue-200 hover:text-white hover:bg-white/10'
            } ${collapsed ? 'justify-center' : ''}`}
            style={activeTab === id ? { background: 'linear-gradient(135deg, #C8102E 0%, #9B0D22 100%)' } : {}}
            title={collapsed ? label : ''}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* User / Logout */}
      {!collapsed && (
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2 px-2 py-2 rounded-xl bg-white/5 mb-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'var(--craft-red)' }}>
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-blue-300 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-300 hover:bg-red-500/20 text-sm transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </aside>
  );
}

// ── STAT CARD ─────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={22} className="text-white" />
        </div>
        <span className="text-xs text-gray-400 font-medium">{sub}</span>
      </div>
      <p className="text-2xl font-black text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

// ── DASHBOARD VIEW ─────────────────────────────────────────────────────────────
function DashboardView({ statsData }) {
  const { stats, recentOrders, topProducts } = statsData;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>Dashboard Overview</h2>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ShoppingBag} label="Total Orders" value={stats.totalOrders} color="bg-blue-500" sub="All time" />
        <StatCard icon={Clock} label="Pending Orders" value={stats.pendingOrders} color="bg-yellow-500" sub="Need action" />
        <StatCard icon={Package} label="Products" value={stats.totalProducts} color="bg-green-500" sub="Active" />
        <StatCard icon={DollarSign} label="Revenue" value={`LKR ${(stats.totalRevenue / 1000).toFixed(0)}K`} color="bg-purple-500" sub="Confirmed" />
      </div>

      {stats.lowStockProducts > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle size={20} className="text-orange-500 flex-shrink-0" />
          <p className="text-sm text-orange-700 font-medium">
            <strong>{stats.lowStockProducts}</strong> product{stats.lowStockProducts > 1 ? 's are' : ' is'} running low on stock. Review inventory.
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Recent Orders</h3>
            <span className="text-xs text-gray-400">{recentOrders.length} orders</span>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.map((o) => (
              <div key={o._id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">#{o.orderNumber}</p>
                    <p className="text-xs text-gray-500">{o.customerName} · {o.customerPhone}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm" style={{ color: 'var(--craft-navy)' }}>LKR {o.totalPrice.toLocaleString()}</p>
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[o.status]}`}>
                      {o.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50">
            <h3 className="font-bold text-gray-800">Top Selling Products</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {topProducts.map((p, i) => (
              <div key={p._id} className="p-4 flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: i === 0 ? '#D4AF37' : i === 1 ? '#C0C0C0' : '#CD7F32' }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.category} · {p.salesCount} sold</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold" style={{ color: 'var(--craft-navy)' }}>LKR {p.price}</p>
                  <p className={`text-xs ${p.stock <= 5 ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                    {p.stock} left
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PRODUCT FORM MODAL ─────────────────────────────────────────────────────────
function ProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState(product || {
    name: '', category: 'Beads', price: '', originalPrice: '', stock: '',
    description: '', images: [''], isFeatured: false, isBestSeller: false, isNew: false, isActive: true,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const clean = { ...form, price: Number(form.price), stock: Number(form.stock) };
    if (form.originalPrice) clean.originalPrice = Number(form.originalPrice);
    await onSave(clean);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h3 className="font-bold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Product Name *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-blue-400 transition-colors"
              placeholder="e.g. Glass Beads Mix (50pcs)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Price (LKR) *</label>
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                placeholder="450"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Original Price</label>
              <input
                type="number"
                min="0"
                value={form.originalPrice || ''}
                onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                placeholder="500 (for sale display)"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Stock *</label>
              <input
                required
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                placeholder="25"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm resize-none"
              placeholder="Product description..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Image URL</label>
            <input
              value={form.images?.[0] || ''}
              onChange={(e) => setForm({ ...form, images: [e.target.value] })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
              placeholder="https://..."
            />
          </div>

          {/* Flags */}
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'isFeatured', label: '⭐ Featured' },
              { key: 'isBestSeller', label: '🔥 Best Seller' },
              { key: 'isNew', label: '✨ New Arrival' },
              { key: 'isActive', label: '✅ Active' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-3 rounded-xl text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #0F2D6B, #091D47)' }}>
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── PRODUCTS VIEW ─────────────────────────────────────────────────────────────
function ProductsView({ token }) {
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleSave = async (data) => {
    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const saved = await res.json();
        if (editingProduct) {
          setProducts((prev) => prev.map((p) => (p._id === saved._id ? saved : p)));
        } else {
          setProducts((prev) => [saved, ...prev]);
        }
        showToast(`Product ${editingProduct ? 'updated' : 'created'} successfully!`);
      } else {
        // Demo mode
        if (editingProduct) {
          setProducts((prev) => prev.map((p) => (p._id === editingProduct._id ? { ...p, ...data } : p)));
        } else {
          setProducts((prev) => [{ ...data, _id: String(Date.now()), salesCount: 0 }, ...prev]);
        }
        showToast(`Product ${editingProduct ? 'updated' : 'created'}! (demo mode)`);
      }
    } catch {
      if (editingProduct) {
        setProducts((prev) => prev.map((p) => (p._id === editingProduct._id ? { ...p, ...data } : p)));
      } else {
        setProducts((prev) => [{ ...data, _id: String(Date.now()), salesCount: 0 }, ...prev]);
      }
      showToast(`Saved in demo mode`);
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    } catch {}
    setProducts((prev) => prev.filter((p) => p._id !== id));
    showToast('Product deleted');
  };

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      {toast && (
        <div className="toast fixed bottom-4 right-4 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold">
          ✓ {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>Products</h2>
        <button
          onClick={() => { setEditingProduct(null); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg"
          style={{ background: 'linear-gradient(135deg, #C8102E, #9B0D22)' }}
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white"
        />
      </div>

      {/* Products table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Product</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Stock</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.salesCount} sold</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{p.category}</td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-800">LKR {p.price}</p>
                    {p.originalPrice && <p className="text-xs text-gray-400 line-through">LKR {p.originalPrice}</p>}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${p.stock <= 5 ? 'text-red-600' : p.stock <= 15 ? 'text-orange-500' : 'text-green-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.stock <= 5 ? 'bg-red-500' : p.stock <= 15 ? 'bg-orange-400' : 'bg-green-500'}`} />
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditingProduct(p); setShowModal(true); }}
                        className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors text-blue-500"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-400"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <ProductModal
          product={editingProduct}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingProduct(null); }}
        />
      )}
    </div>
  );
}

// ── ORDERS VIEW ───────────────────────────────────────────────────────────────
function OrdersView({ token }) {
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
    } catch {}
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
  };

  const filtered = statusFilter === 'all' ? orders : orders.filter((o) => o.status === statusFilter);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>Orders</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <RefreshCw size={14} />
          <span>{orders.length} total orders</span>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              statusFilter === s ? 'text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={statusFilter === s ? { background: 'var(--craft-navy)' } : {}}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.map((order) => (
          <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
            >
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-gray-800">#{order.orderNumber}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {order.customerName} · {order.customerPhone} · {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold text-gray-800 text-sm">LKR {order.totalPrice.toLocaleString()}</p>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${expandedOrder === order._id ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {expandedOrder === order._id && (
              <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-4">
                {/* Items */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Order Items</p>
                  <div className="space-y-1.5">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.name} × {item.quantity}</span>
                        <span className="font-semibold text-gray-800">LKR {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status update */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(order._id, s)}
                        disabled={order.status === s}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${
                          order.status === s
                            ? 'bg-gray-800 text-white border-gray-800'
                            : `hover:opacity-80 ${STATUS_COLORS[s]}`
                        }`}
                      >
                        {order.status === s ? '✓ ' : ''}{s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* WhatsApp reply */}
                <a
                  href={`https://wa.me/${order.customerPhone.replace(/^0/, '94')}?text=Hi ${order.customerName}! Your order #${order.orderNumber} status has been updated to: ${order.status.toUpperCase()}. Thank you for shopping at Pettagama.lk! 🎨`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-semibold"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                >
                  💬 Notify Customer via WhatsApp
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ANALYTICS VIEW ─────────────────────────────────────────────────────────────
function AnalyticsView({ statsData }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [42000, 58000, 73000, 65000, 89000, 94000];
  const maxVal = Math.max(...values);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>Analytics</h2>

      {/* Simple bar chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-700 mb-6 text-sm uppercase tracking-wide">Monthly Revenue (LKR)</h3>
        <div className="flex items-end gap-4 h-40">
          {months.map((month, i) => (
            <div key={month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-500">{(values[i] / 1000).toFixed(0)}K</span>
              <div
                className="w-full rounded-t-lg transition-all duration-700"
                style={{
                  height: `${(values[i] / maxVal) * 100}%`,
                  background: 'linear-gradient(180deg, #C8102E, #0F2D6B)',
                }}
              />
              <span className="text-xs font-medium text-gray-600">{month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          <p className="text-3xl font-black" style={{ color: 'var(--craft-red)', fontFamily: 'var(--font-playfair)' }}>142</p>
          <p className="text-sm text-gray-500 mt-1">Total Orders</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          <p className="text-3xl font-black" style={{ color: 'var(--craft-navy)', fontFamily: 'var(--font-playfair)' }}>LKR 485K</p>
          <p className="text-sm text-gray-500 mt-1">Total Revenue</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          <p className="text-3xl font-black" style={{ color: '#16a34a', fontFamily: 'var(--font-playfair)' }}>LKR 3,420</p>
          <p className="text-sm text-gray-500 mt-1">Avg Order Value</p>
        </div>
      </div>
    </div>
  );
}

// ── SETTINGS VIEW ─────────────────────────────────────────────────────────────
function SettingsView() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>Settings</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h3 className="font-bold text-gray-700">Store Settings</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'WhatsApp Number', value: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94XXXXXXXXX', placeholder: '94XXXXXXXXX' },
            { label: 'Store Email', value: 'hello@pettagama.lk', placeholder: '' },
            { label: 'Free Delivery Threshold (LKR)', value: '5000', placeholder: '' },
            { label: 'Admin Contact', value: '+94 XX XXX XXXX', placeholder: '' },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{field.label}</label>
              <input
                defaultValue={field.value}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
              />
            </div>
          ))}
        </div>
        <div className="pt-2">
          <button className="btn-primary text-sm px-6 py-2.5">Save Settings</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-700 mb-4">Change Password</h3>
        <div className="space-y-3 max-w-sm">
          <input type="password" placeholder="Current password" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
          <input type="password" placeholder="New password" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
          <input type="password" placeholder="Confirm new password" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
          <button className="btn-primary text-sm px-6 py-2.5">Update Password</button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ADMIN PAGE ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [statsData, setStatsData] = useState(DEMO_STATS);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('admin_token');
      const savedUser = localStorage.getItem('admin_user');
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setStatsData(data); })
      .catch(() => {});
  }, [token]);

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setUser(null);
    setToken('');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="spinner w-10 h-10" />
    </div>;
  }

  if (!user) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Menu size={18} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="capitalize font-semibold text-gray-700">{activeTab}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors">
              <Eye size={14} /> View Store
            </a>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'var(--craft-red)' }}>
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && <DashboardView statsData={statsData} />}
          {activeTab === 'products' && <ProductsView token={token} />}
          {activeTab === 'orders' && <OrdersView token={token} />}
          {activeTab === 'analytics' && <AnalyticsView statsData={statsData} />}
          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}
