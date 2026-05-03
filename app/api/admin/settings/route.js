import { NextResponse } from 'next/server';
import { initDB, query } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/auth';

export async function GET(request) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth || auth.role !== 'admin')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await initDB();
    const res = await query('SELECT key, value FROM site_settings');
    const settings = {};
    res.rows.forEach(r => { settings[r.key] = r.value; });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth || auth.role !== 'admin')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await initDB();
    const data = await request.json();
    for (const [key, value] of Object.entries(data)) {
      await query(
        'INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()',
        [key, value]
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
