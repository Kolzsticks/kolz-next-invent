'use server'

import { CreateUserInput, Product, RealUser, UpdateProductData } from "@/types/types";
// lib/actions.ts
import { db } from "./db";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import moment from "moment"; // Correct way to import moment
import { EditUserInput, SalePageType } from "./zod";
import { hash } from 'bcryptjs';



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

export async function createUser(user: CreateUserInput): Promise<RealUser> {
  if (!user) {
    throw new Error("User data is required");
  }

  try {
    // Hash the password before storing
    const hashedPassword = await hash(user.password, 10);

    const newUser = await db.user.create({
      data: {
        name: user.name,
        username: user.username,
        password: hashedPassword,
        role: user.role,
      }
    });

    // revalidatePath('/users');
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function deleteUser(id: number) {
  try {
    await db.user.delete({
      where: { id }
    });
    // revalidatePath('/users');
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: 'Failed to delete user' };
  }
}

export async function getAllUsers(): Promise<RealUser[]> {
  try {
    const allUsers = await db.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
      }
    });
    return allUsers as RealUser[];  // Now the types match
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getUser(id: number) {
  const user = await db.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
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

export async function getAllProducts(date?: string): Promise<Product[]> {
  try {
    // Create date filter if date is provided
    const dateFilter = date ? {
      date: {
        gte: new Date(`${date}T00:00:00.000Z`),
        lt: new Date(`${date}T23:59:59.999Z`),
      }
    } : {};

    const products = await db.product.findMany({
      where: dateFilter,
      orderBy: {
        date: 'desc',
      },
    });

    // Format the products with a formatted date
    const formattedProducts: Product[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      subcategory: product.subcategory ?? undefined,
      price: Number(product.price),
      venue: product.venue ?? "Unknown",
      quantity: product.quantity,
      date: moment(product.date).format("MMMM D, YYYY h:mm A"),
    }));

    return formattedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function getAllCategories() {
  try {
    const categories = await db.product.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
    });

    return categories.map((category) => category.category);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
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

export async function deleteProduct(id: number) {
  try {
    // Check for existing sales before deletion
    const existingSales = await db.sales.findFirst({
      where: { product_id: id }
    });

    if (existingSales) {
      return {
        success: false,
        error: 'Cannot delete product with existing sales. Remove sales first.'
      };
    }

    await db.product.delete({
      where: { id }
    });

    // revalidatePath('/products');
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error: 'Failed to delete product'
    };
  }
}

export async function deleteSale(id: number) {
  try {
    await db.sales.delete({
      where: { id }
    });

    // Update product quantity after sale deletion
    const sale = await db.sales.findUnique({
      where: { id },
      select: { product_id: true, quantity: true }
    });

    if (sale) {
      await db.product.update({
        where: { id: sale.product_id },
        data: {
          quantity: {
            increment: sale.quantity // Return the quantity back to product
          }
        }
      });
    }

    // revalidatePath('/sales');
    return { success: true };
  } catch (error) {
    console.error("Error deleting sale:", error);
    return {
      success: false,
      error: 'Failed to delete sale'
    };
  }
}

export async function editUser(userId: number, data: Partial<EditUserInput>): Promise<RealUser> {
  if (!data) {
    throw new Error("User data is required");
  }

  try {
    const updateData: any = {
      name: data.name,
      username: data.username,
      role: data.role,
    };

    // Only hash and update password if it's provided
    if (data.password) {
      updateData.password = await hash(data.password, 10);
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}










