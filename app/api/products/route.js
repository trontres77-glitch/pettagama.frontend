import { NextResponse } from 'next/server';
import { initDB } from '@/lib/db';
import { getProducts, createProduct } from '@/models/Product';
import { getAuthFromRequest } from '@/lib/auth';

export async function GET(request) {
  try {
    await initDB();
    const { searchParams } = new URL(request.url);
    const result = await getProducts({
      category: searchParams.get('category'),
      featured: searchParams.get('featured'),
      bestSeller: searchParams.get('bestSeller'),
      isNew: searchParams.get('isNew'),
      search: searchParams.get('search'),
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth || auth.role !== 'admin')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await initDB();
    const data = await request.json();
    const product = await createProduct(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Product POST error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
