// /app/api/sales/addSale.ts (Server-side action)
import  db  from '@/lib/db';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { product_id, price, quantity } = await request.json();

    // Check if product exists and has enough stock
    const product = await db.product.findUnique({
      where: { id: product_id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.quantity < quantity) {
      return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
    }

    // Create the sale record
    const sale = await db.sales.create({
      data: {
        product_id,
        price,
        quantity,
      },
    });

    // Reduce product quantity after the sale
    await db.product.update({
      where: { id: product_id },
      data: { quantity: product.quantity - quantity },
    });

    return NextResponse.json(sale);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add sale" }, { status: 500 });
  }
}
