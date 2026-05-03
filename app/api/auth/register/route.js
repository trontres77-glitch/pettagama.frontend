import { NextResponse } from 'next/server';
import { initDB } from '@/lib/db';
import { createUser, findUserByEmail } from '@/models/User';
import { signToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await initDB();
    const { name, email, password, phone } = await request.json();
    if (!name || !email || !password)
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
    if (password.length < 6)
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });

    const existing = await findUserByEmail(email);
    if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });

    const user = await createUser({ name, email, password, phone });
    const token = signToken({ userId: user.id, role: user.role, name: user.name });
    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
