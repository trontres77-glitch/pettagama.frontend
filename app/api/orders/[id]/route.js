import { NextResponse } from 'next/server';
import { initDB } from '@/lib/db';
import { getOrderById, updateOrderStatus } from '@/models/Order';
import { getAuthFromRequest } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    await initDB();
    const order = await getOrderById(params.id);
    if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth || auth.role !== 'admin')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await initDB();
    const { status } = await request.json();
    const order = await updateOrderStatus(params.id, status);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
