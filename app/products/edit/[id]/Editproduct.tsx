"use client";

import { Button } from "@/components/ui/button"; // ShadCN UI Button
import { Input } from "@/components/ui/input"; // ShadCN UI Input
import { Label } from "@/components/ui/label"; // ShadCN UI Label
import Link from "next/link";
import { toast } from "sonner";

interface EditProductProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  name: string;
  category: string;
  subcategory: string | undefined;
  venue: string;
  price: number | null;
  quantity: number;
  result: boolean;
}

const EditProduct: React.FC<EditProductProps> = ({
  handleSubmit,
  name,
  category,
  subcategory = "",
  venue = "",
  price,
  quantity,
  result,
}) => {
  if (result) {
    toast.success("Product updated successfully");
  } else {
    toast.error("Product update failed");
  }
  return (
    <div className="flex flex-col justify-center items-center m-auto w-full max-w-3xl p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 w-full">
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Name input field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-lg font-medium">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={name}
            className=""
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
              defaultValue={category}
              className=""
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
              defaultValue={subcategory || ""}
              className=""
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
            defaultValue={Number(price)}
            className=""
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
              defaultValue={quantity}
              className=""
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
              defaultValue={venue || ""}
              className=""
            />
          </div>
        </div>

        {/* Submit button */}
        <Button type="submit" className="w-full sm:w-auto">
          Update Product
        </Button>
      </form>

      {/* Link to go back to products list */}
      <Link
        href="/products"
        className="text-blue-500 hover:underline mt-4 cursor-pointer"
      >
        <Button>Back to Products List</Button>
      </Link>
    </div>
  );
};

export default EditProduct;
