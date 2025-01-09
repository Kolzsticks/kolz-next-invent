'use server'

// lib/actions.ts
import { db } from "./db";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";



export async function createProduct(productData: {
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  quantity: number;
  venue?: string;
}) {
  if (!productData) {
    throw new Error("Product data is required");
  }

  try {
    // Create the new product in the database

    const newProduct = await db.product.create({  
      data: productData,
    });
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // Rethrow the error so it can be caught in the ProductForm
  }
}




// READ all products
export async function getAllProducts() {
  try {
    const products = await db.product.findMany();
    return products;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
}



interface UpdateProductData {
  name: string;
  category: string;
  subcategory: string | null;
  price: number;
  venue: string | null;
  quantity: number;
}

export async function updateProduct(id: number, data: {
  name: string;
  category: string;
  subcategory: string | null;
  price: number;
  venue: string | null;
  quantity: number;
}) {
  return await db.product.update({
    where: { id },
    data: {
      name: data.name,
      category: data.category,
      subcategory: data.subcategory,
      price: data.price ? new Prisma.Decimal(data.price.toString()) : undefined, // Convert to string first
      venue: data.venue,
      quantity: data.quantity
    },
  });
}
// DELETE a product
export async function deleteProduct(id: number) {

  try {
    await db.product.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('Failed to delete product');
  }

  revalidateTag("products");
}








