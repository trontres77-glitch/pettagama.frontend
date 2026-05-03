import { NextResponse } from 'next/server';
import { initDB } from '@/lib/db';
import { getAdminStats } from '@/models/Order';
import { getAuthFromRequest } from '@/lib/auth';

export async function GET(request) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth || auth.role !== 'admin')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await initDB();
    const data = await getAdminStats();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
