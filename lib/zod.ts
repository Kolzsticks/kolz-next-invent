
import { object, string } from "zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";



export const signInSchema = object({
  username: string({ required_error: "Email is required" }).min(1, "Username is required"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
});



export const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  subcategory: z.string().min(1, { message: "Subcategory is required" }),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .transform((val) => parseFloat(val)), // Convert string to float
  quantity: z
    .string()
    .min(1, { message: "Quantity is required" })
    .transform((val) => parseInt(val)), // Convert string to integer
  venue: z.string().min(1, { message: "Venue is required" }),
});


export const saleSchema = z.object({
  products: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      quantity: z.string().transform((val) => parseInt(val)),
      price: z.string().transform((val) => parseFloat(val)),
    })
  ),
});



export const salesPageSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  price: z.number(),
  quantity: z.number(),
  date: z.string(),
  product: z.object({
    id: z.number(),
    name: z.string(),
    category: z.string(),
    subcategory: z.string().nullable(),
    price: z.number(),
    venue: z.string().nullable(),
    quantity: z.number(),
    image_url: z.string().nullable(),
  })
});




export type SalePageType = z.infer<typeof salesPageSchema>;
