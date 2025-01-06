'use server'

// lib/actions.ts
import { db } from "./db";


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

// UPDATE a product
export async function updateProduct(id: number, data: {
  name?: string;
  category?: string;
  subcategory: string | null;
  price?: number;
  quantity: number,
  venue: string | null;
}) {
  try {
    const updatedProduct = await db.product.update({
      where: { id },
      data,
    });
    return updatedProduct;
  } catch (error) {
    throw new Error('Failed to update product');
  }
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
}



export const handleUpdate = async (formData: FormData, productId: number) => {

  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const subcategory = formData.get("subcategory") as string | null;
  const price = parseFloat(formData.get("price") as string);
  const venue = formData.get("venue") as string | null;
  const quantity = parseInt(formData.get("quantity") as string);
    // Update the product data
    await updateProduct(productId, {
      name,
      category,
      subcategory,
      price,
      venue,
      quantity,
    });

};