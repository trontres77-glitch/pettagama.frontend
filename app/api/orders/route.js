import { NextResponse } from 'next/server';
import { initDB } from '@/lib/db';
import { createOrder, getOrders } from '@/models/Order';
import { getAuthFromRequest } from '@/lib/auth';

export async function GET(request) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth || auth.role !== 'admin')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await initDB();
    const { searchParams } = new URL(request.url);
    const result = await getOrders({ status: searchParams.get('status'), page: parseInt(searchParams.get('page') || '1') });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await initDB();
    const data = await request.json();
    const order = await createOrder(data);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order POST error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
