'use server'

import { Product, UpdateProductData } from "@/types/types";
// lib/actions.ts
import { db } from "./db";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";



export async function createProduct(productData: UpdateProductData) {
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



export async function getAllSales() {
  try {
    const sales = await db.sales.findMany();
    return sales;
  } catch (error) {
    throw new Error('Failed to fetch sales');
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




export async function updateProduct(id: number, data: UpdateProductData) {
  const formattedData = {
    ...data,
    price: new Prisma.Decimal(data.price)
  };

  const updatedProduct = await db.product.update({
    where: { id },
    data: formattedData
  });

  // Serialize the response
  return JSON.parse(JSON.stringify(updatedProduct));
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


export async function deleteSale(id: number) {
  try {
    await db.sales.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('Failed to delete sale');
  }

  revalidateTag("sales");
}









