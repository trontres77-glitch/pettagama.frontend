import { NextResponse } from 'next/server';
import { query, initDB } from '@/lib/db';
import { checkUserPassword } from '@/models/User';
import { signToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await initDB();
    const { email, password } = await request.json();
    if (!email || !password)
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });

    const res = await query('SELECT * FROM users WHERE email = $1 AND is_active = true LIMIT 1', [email.toLowerCase()]);
    const user = res.rows[0];
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const isMatch = await checkUserPassword(user, password);
    if (!isMatch) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const token = signToken({ userId: user.id, role: user.role, name: user.name });
    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
