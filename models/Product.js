import { query } from '@/lib/db';

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
}

export async function getProducts({ category, featured, bestSeller, isNew, search, page = 1, limit = 20 } = {}) {
  let conditions = ['is_active = true'];
  let params = [];
  let idx = 1;

  if (category && category !== 'All') { conditions.push(`category = $${idx++}`); params.push(category); }
  if (featured === 'true') { conditions.push(`is_featured = true`); }
  if (bestSeller === 'true') { conditions.push(`is_best_seller = true`); }
  if (isNew === 'true') { conditions.push(`is_new = true`); }
  if (search) {
    conditions.push(`(name ILIKE $${idx} OR description ILIKE $${idx} OR $${idx} = ANY(tags))`);
    params.push(`%${search}%`);
    idx++;
  }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
  const offset = (page - 1) * limit;

  const countRes = await query(`SELECT COUNT(*) FROM products ${where}`, params);
  const total = parseInt(countRes.rows[0].count);

  params.push(limit, offset);
  const res = await query(
    `SELECT * FROM products ${where} ORDER BY is_featured DESC, sales_count DESC, created_at DESC LIMIT $${idx} OFFSET $${idx + 1}`,
    params
  );

  return { products: res.rows, total, page, pages: Math.ceil(total / limit) };
}

export async function getProductById(id) {
  const res = await query('SELECT * FROM products WHERE id = $1 AND is_active = true LIMIT 1', [id]);
  return res.rows[0] || null;
}

export async function createProduct(data) {
  const slug = generateSlug(data.name);
  const res = await query(
    `INSERT INTO products (name, slug, category, description, price, original_price, stock, images, tags, is_active, is_featured, is_best_seller, is_new)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
    [data.name, slug, data.category, data.description || '', data.price, data.originalPrice || null,
     data.stock, data.images || [], data.tags || [], data.isActive !== false,
     data.isFeatured || false, data.isBestSeller || false, data.isNew || false]
  );
  return res.rows[0];
}

export async function updateProduct(id, data) {
  const fields = [];
  const params = [];
  let idx = 1;

  const map = {
    name: 'name', category: 'category', description: 'description',
    price: 'price', originalPrice: 'original_price', stock: 'stock',
    images: 'images', tags: 'tags', isActive: 'is_active',
    isFeatured: 'is_featured', isBestSeller: 'is_best_seller', isNew: 'is_new',
  };

  for (const [key, col] of Object.entries(map)) {
    if (data[key] !== undefined) {
      fields.push(`${col} = $${idx++}`);
      params.push(data[key]);
    }
  }

  if (!fields.length) return getProductById(id);
  params.push(id);
  const res = await query(`UPDATE products SET ${fields.join(',')} WHERE id = $${idx} RETURNING *`, params);
  return res.rows[0];
}

export async function deleteProduct(id) {
  await query('UPDATE products SET is_active = false WHERE id = $1', [id]);
}

export async function getAdminProducts({ search, category } = {}) {
  let conditions = [];
  let params = [];
  let idx = 1;

  if (category && category !== 'All') { conditions.push(`category = $${idx++}`); params.push(category); }
  if (search) { conditions.push(`name ILIKE $${idx++}`); params.push(`%${search}%`); }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
  const res = await query(`SELECT * FROM products ${where} ORDER BY created_at DESC`, params);
  return res.rows;
}
