// app/api/products/search/route.ts
import  db  from '@/lib/db';
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json([]);
    }

    const products = await db.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive', // Case-insensitive search
        },
      },
      take: 10, // Limit results
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: "Failed to search products" }, { status: 500 });
  }
}