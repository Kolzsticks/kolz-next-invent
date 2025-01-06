"use client";

import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/lib/actions";

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string | null;
  price: number;
  venue: string | null;
  quantity: number;
  image_url?: string | null;
  date?: Date | null;
}

export function ProductForm({ product }: { product: Product }) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const price = formData.get("price");
    const quantity = formData.get("quantity");

    // Type safety checks
    if (!price || !quantity) {
      toast.error("Price and quantity are required");
      return;
    }

    try {
      const updatedProduct = {
        name: formData.get("name") as string,
        category: formData.get("category") as string,
        subcategory: (formData.get("subcategory") as string) || null,
        price: parseFloat(price as string),
        venue: (formData.get("venue") as string) || null,
        quantity: parseInt(quantity as string),
      };

      // Additional validation
      if (isNaN(updatedProduct.price) || isNaN(updatedProduct.quantity)) {
        toast.error("Invalid price or quantity value");
        return;
      }

      await updateProduct(product.id, updatedProduct);
      
      toast.success("Product updated successfully!");
      // router.refresh();
      // router.push('/products');
    } catch (error) {
      toast.error("Failed to update product. Please try again.");
      console.error(error);
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
          <Input
            id="name"
            name="name"
            defaultValue={product.name}
            required
          />
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
            <Input
              id="venue"
              name="venue"
              defaultValue={product.venue || ""}
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="flex gap-4">
          <Button type="submit">
            Update Product
          </Button>

          <Link href="/products">
            <Button type="button" variant="outline">
              Back to Products List
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
}