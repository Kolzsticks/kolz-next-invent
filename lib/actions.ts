'use server'

import { Product, UpdateProductData } from "@/types/types";
// lib/actions.ts
import { db } from "./db";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import moment from "moment"; // Correct way to import moment
import { SalePageType } from "./zod";



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



export const getAllSales = async (date?: string): Promise<SalePageType[]> => {
  try {
    // Create date filter if date is provided
    const dateFilter = date ? {
      date: {
        gte: new Date(`${date}T00:00:00.000Z`),
        lt: new Date(`${date}T23:59:59.999Z`),
      }
    } : {};

    const sales = await db.sales.findMany({
      where: dateFilter,
      include: {
        product: true, // Fetch related product data
      },
      orderBy: {
        date: 'desc', // Optional: Order by date descending
      },
    });

    // Format sales and return
    return sales.map((sale) => ({
      ...sale,
      date: moment(sale.date).format("MMMM D, YYYY h:mm A"), // Format date
      price: parseFloat(sale.price.toString()), // Convert Prisma.Decimal to number
      product: {
        ...sale.product,
        subcategory: sale.product.subcategory ?? null, // Handle nullable subcategory
        venue: sale.product.venue ?? null, // Handle nullable venue
        image_url: sale.product.image_url ?? null, // Handle nullable image_url
        price: parseFloat(sale.product.price.toString()), // Convert Prisma.Decimal to number
      },
    }));
  } catch (error) {
    console.error("Error fetching sales:", error);
    throw new Error("Failed to fetch sales");
  }
};



export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await db.product.findMany();

    // Format the products with a formatted date
    const formattedProducts: Product[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      subcategory: product.subcategory ?? undefined, // Handle null to match optional type
      price: Number(product.price), // Ensure price is a number if Decimal type
      venue: product.venue ?? "Unknown", // Fallback for venue if null
      quantity: product.quantity,
      date: moment(product.date).format("MMMM D, YYYY h:mm A"), // Format date
    }));

    return formattedProducts;
  } catch (error) {
    console.error("Error fetching products:", error); // Debug log for errors
    throw new Error("Failed to fetch products");
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











