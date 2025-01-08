
import { object, string } from "zod";
import * as z from "zod";

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