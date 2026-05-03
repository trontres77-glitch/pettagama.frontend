import { query } from '@/lib/db';

function generateOrderNumber() {
  const now = new Date();
  const yr = now.getFullYear().toString().slice(-2);
  const mo = String(now.getMonth() + 1).padStart(2, '0');
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `PG${yr}${mo}${rand}`;
}

export async function createOrder({ customerName, customerPhone, customerEmail, items, totalPrice, notes, address }) {
  const orderNumber = generateOrderNumber();
  const res = await query(
    `INSERT INTO orders (order_number, customer_name, customer_phone, customer_email, items, total_price, notes, address)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [orderNumber, customerName, customerPhone, customerEmail || '', JSON.stringify(items), totalPrice, notes || '', address || '']
  );
  return res.rows[0];
}

export async function getOrders({ status, page = 1, limit = 20 } = {}) {
  let conditions = [];
  let params = [];
  let idx = 1;

  if (status && status !== 'all') { conditions.push(`status = $${idx++}`); params.push(status); }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
  const offset = (page - 1) * limit;
  const countRes = await query(`SELECT COUNT(*) FROM orders ${where}`, params);
  const total = parseInt(countRes.rows[0].count);

  params.push(limit, offset);
  const res = await query(
    `SELECT * FROM orders ${where} ORDER BY created_at DESC LIMIT $${idx} OFFSET $${idx + 1}`,
    params
  );
  return { orders: res.rows, total };
}

export async function getOrderById(id) {
  const res = await query('SELECT * FROM orders WHERE id = $1 LIMIT 1', [id]);
  return res.rows[0] || null;
}

export async function updateOrderStatus(id, status) {
  const res = await query('UPDATE orders SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
  return res.rows[0];
}

export async function getAdminStats() {
  const [totalOrders, pendingOrders, totalProducts, lowStock, revenue, statusBreakdown, recentOrders, topProducts] = await Promise.all([
    query('SELECT COUNT(*) FROM orders'),
    query("SELECT COUNT(*) FROM orders WHERE status = 'pending'"),
    query('SELECT COUNT(*) FROM products WHERE is_active = true'),
    query('SELECT COUNT(*) FROM products WHERE is_active = true AND stock <= 5'),
    query("SELECT COALESCE(SUM(total_price),0) as total FROM orders WHERE status IN ('confirmed','processing','shipped','delivered')"),
    query("SELECT status, COUNT(*) as count FROM orders GROUP BY status"),
    query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5'),
    query('SELECT * FROM products WHERE is_active = true ORDER BY sales_count DESC LIMIT 5'),
  ]);

  return {
    stats: {
      totalOrders: parseInt(totalOrders.rows[0].count),
      pendingOrders: parseInt(pendingOrders.rows[0].count),
      totalProducts: parseInt(totalProducts.rows[0].count),
      lowStockProducts: parseInt(lowStock.rows[0].count),
      totalRevenue: parseFloat(revenue.rows[0].total),
    },
    statusBreakdown: statusBreakdown.rows,
    recentOrders: recentOrders.rows,
    topProducts: topProducts.rows,
  };
}
