
import { object, string } from "zod";
import * as z from "zod";




export const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
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


export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role: z.enum(["admin", "user", "moderator"], {
    required_error: "Please select a role",
  }),
});

export type UserFormData = z.infer<typeof userSchema>;



export const editUserSchema = z.object({
  id: z.number(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  role: z.string().min(1, { message: "Role is required" }),
  // Make password optional for updates
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .optional(),
});

export type EditUserInput = z.infer<typeof editUserSchema>;

