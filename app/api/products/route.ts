// app/api/products/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { Product } from '@/types/types';

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
    const { name, category, subcategory, price, venue, quantity, image_url } = body;

    // Validate required fields
    if (!name || !category || price == null) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create the product data object
    const productData= {
      name,
      category,
      subcategory,
      price,
      venue,
      quantity: parseInt(quantity),
      image_url
    };

    // Only add image_url if it exists
    // if (image_url) {
    //   productData['image_url'] = image_url;
    // }

    const newProduct = await db.product.create({
      data: productData,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}