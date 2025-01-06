"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner"; // Importing toast for success alert

const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  subcategory: z.string().optional(),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .transform((val) => parseFloat(val)), // Convert string to float
  quantity: z
    .string()
    .min(1, { message: "Quantity is required" })
    .transform((val) => parseInt(val)), // Convert string to integer
  venue: z.string().optional(),
});

export function ProductForm() {
  const [loading, setLoading] = useState(false); // Loading state
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      subcategory: "",
      quantity: 0,
      venue: "",
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setLoading(true); // Start loading
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Product added successfully");
        form.reset(); // Reset the form on success
      } else {
        const errorData = await response.json(); // Try to get error details from the server
        toast.error(
          errorData?.message || "Failed to add product. Please try again."
        );
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Product Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Selling Price Field */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selling Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="1000"
                  {...field}
                  placeholder="Enter Selling Price"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Category Dropdown */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                    <SelectItem value="Spirits">Spirits</SelectItem>
                    <SelectItem value="Bhampagne_wine">
                      Champagne & Wine
                    </SelectItem>
                    <SelectItem value="Food">food</SelectItem>
                    <SelectItem value="Cakes">Cakes</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subcategory Dropdown */}
          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subcategory" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="beer">Beer</SelectItem>
                    <SelectItem value="soft_drinks">Soft Drinks</SelectItem>
                    <SelectItem value="juice_drinks">Juice Drinks</SelectItem>
                    <SelectItem value="cognac">Cognac</SelectItem>
                    <SelectItem value="whiskey">Whiskey</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Quantity Field */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Venue Dropdown */}
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Venue" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="lounge">lounge</SelectItem>
                    <SelectItem value="club">club</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Submit Button */}
        <Button type="submit" disabled={loading}>
          {loading ? (
            <div className="flex items-center space-x-2">
              <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
              <span>Adding...</span>
            </div>
          ) : (
            "Add Product"
          )}
        </Button>
      </form>
    </Form>
  );
}
