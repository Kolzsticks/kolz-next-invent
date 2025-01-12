// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Fetch all products (GET)
export async function GET() {
  try {
    const products = await db.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// Create a new product (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, subcategory, price, venue, quantity } = body;

    // Validate required fields
    if (!name || !category || price == null) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProduct = await db.product.create({
      data: {
        name,
        category,
        subcategory,
        price,
        venue,
        quantity
      },
    });

    // console.log('Request body:', body);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
