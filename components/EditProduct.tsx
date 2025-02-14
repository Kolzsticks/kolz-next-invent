"use client";

import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/lib/actions";
import { useState } from "react";
import { Product } from "@/types/types";



export function ProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
  
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const name = formData.get("name");
    const category = formData.get("category");
  
    // More thorough validation
    if (!name || !category || !price || !quantity) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }
  
    try {
      const updatedProduct = {
        name: name as string,
        category: category as string,
        subcategory: formData.get("subcategory") as string || "",
        price: parseFloat(price as string),
        venue: formData.get("venue") as string || "",
        quantity: parseInt(quantity as string),
        image_url: product.image_url || null,
      };
  
      if (isNaN(updatedProduct.price) || isNaN(updatedProduct.quantity)) {
        toast.error("Invalid price or quantity value");
        setLoading(false);
        return;
      }
  
      await updateProduct(product.id, updatedProduct);
      toast.success("Product updated successfully!");
      router.refresh(); // Add this to refresh the page data
      router.push('/products'); // Optionally redirect after success
    } catch (error) {
      toast.error("Failed to update product. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Name input field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-lg font-medium">
            Name
          </Label>
          <Input id="name" name="name" defaultValue={product.name} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Category input field */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-lg font-medium">
              Category
            </Label>
            <Input
              id="category"
              name="category"
              defaultValue={product.category}
              required
            />
          </div>

          {/* Subcategory input field */}
          <div className="space-y-2">
            <Label htmlFor="subcategory" className="text-lg font-medium">
              Subcategory
            </Label>
            <Input
              id="subcategory"
              name="subcategory"
              defaultValue={product.subcategory || ""}
            />
          </div>
        </div>

        {/* Price input field */}
        <div className="space-y-2">
          <Label htmlFor="price" className="text-lg font-medium">
            Price
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product.price}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Quantity input field */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-lg font-medium">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              defaultValue={product.quantity}
              required
            />
          </div>

          {/* Venue input field */}
          <div className="space-y-2">
            <Label htmlFor="venue" className="text-lg font-medium">
              Venue
            </Label>
            <Input id="venue" name="venue" defaultValue={product.venue || ""} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-8">
          {/* Submit Button */}
          <Button type="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center space-x-2">
                <span className="h-4 w-4 animate-spin rounded-full border-4 border-primary border-t-transparent"></span>
                <span>Updating...</span>
              </div>
            ) : (
              "Update"
            )}
          </Button>

          <Link href="/products" prefetch={true}>
            <Button type="button" variant="outline">
              Back to Products List
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
}
