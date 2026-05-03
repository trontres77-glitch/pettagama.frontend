import { NextResponse } from 'next/server';
import { initDB } from '@/lib/db';
import { getProductById, updateProduct, deleteProduct } from '@/models/Product';
import { getAuthFromRequest } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    await initDB();
    const product = await getProductById(params.id);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
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
    const data = await request.json();
    const product = await updateProduct(params.id, data);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth || auth.role !== 'admin')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await initDB();
    await deleteProduct(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
