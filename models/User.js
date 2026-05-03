import { query } from '@/lib/db';
import { hashPassword, comparePassword } from '@/lib/auth';

export async function findUserByEmail(email) {
  const res = await query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email.toLowerCase()]);
  return res.rows[0] || null;
}

export async function findUserById(id) {
  const res = await query('SELECT id,name,email,role,phone,is_active,created_at FROM users WHERE id = $1 LIMIT 1', [id]);
  return res.rows[0] || null;
}

export async function createUser({ name, email, password, role = 'user', phone = '' }) {
  const hashed = await hashPassword(password);
  const res = await query(
    'INSERT INTO users (name, email, password, role, phone) VALUES ($1,$2,$3,$4,$5) RETURNING id,name,email,role,phone,is_active,created_at',
    [name, email.toLowerCase(), hashed, role, phone]
  );
  return res.rows[0];
}

export async function checkUserPassword(user, plainPassword) {
  return comparePassword(plainPassword, user.password);
}

export async function getAllUsers() {
  const res = await query('SELECT id,name,email,role,phone,is_active,created_at FROM users ORDER BY created_at DESC');
  return res.rows;
}
