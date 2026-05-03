import { Pool } from 'pg';

let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }
  return pool;
}

export async function query(text, params) {
  const client = getPool();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('DB Query Error:', error);
    throw error;
  }
}

// Initialize database tables
export async function initDB() {
  const client = getPool();
  
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'user',
      phone VARCHAR(50) DEFAULT '',
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(500) NOT NULL,
      slug VARCHAR(500) UNIQUE,
      category VARCHAR(100) NOT NULL,
      description TEXT DEFAULT '',
      price DECIMAL(10,2) NOT NULL,
      original_price DECIMAL(10,2),
      stock INTEGER DEFAULT 0,
      images TEXT[] DEFAULT '{}',
      tags TEXT[] DEFAULT '{}',
      is_active BOOLEAN DEFAULT true,
      is_featured BOOLEAN DEFAULT false,
      is_best_seller BOOLEAN DEFAULT false,
      is_new BOOLEAN DEFAULT false,
      sales_count INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      order_number VARCHAR(50) UNIQUE,
      customer_name VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(50) NOT NULL,
      customer_email VARCHAR(255) DEFAULT '',
      items JSONB NOT NULL DEFAULT '[]',
      total_price DECIMAL(10,2) NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      notes TEXT DEFAULT '',
      whatsapp_sent BOOLEAN DEFAULT false,
      address TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key VARCHAR(255) PRIMARY KEY,
      value TEXT,
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE OR REPLACE FUNCTION update_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
    $$ language 'plpgsql';

    DROP TRIGGER IF EXISTS update_users_updated_at ON users;
    CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
      FOR EACH ROW EXECUTE FUNCTION update_updated_at();

    DROP TRIGGER IF EXISTS update_products_updated_at ON products;
    CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
      FOR EACH ROW EXECUTE FUNCTION update_updated_at();

    DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
    CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
      FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  `);

  // Insert default settings if not exists
  await client.query(`
    INSERT INTO site_settings (key, value) VALUES
      ('whatsapp_number', '94XXXXXXXXX'),
      ('free_delivery_threshold', '5000'),
      ('announcement_text', 'Free delivery on orders over LKR 5,000 | Islandwide Delivery'),
      ('store_email', 'hello@pettagama.lk'),
      ('store_phone', '+94 XX XXX XXXX')
    ON CONFLICT (key) DO NOTHING;
  `);

  console.log('Database initialized successfully');
}

export default { query, getPool, initDB };
