"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {  EditSaleType } from "@/types/types";
import { updateSale } from "@/lib/actions";

const SalesForm = ({ sales }: { sales: EditSaleType }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const price = formData.get("price");
    const quantity = formData.get("quantity");

    // Validation
    if (!price || !quantity) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const updatedSales = {
        product_id: sales.product_id, // Use the existing product ID
        price: parseFloat(price as string),
        quantity: parseInt(quantity as string),
      };

      if (isNaN(updatedSales.price) || isNaN(updatedSales.quantity)) {
        toast.error("Invalid price or quantity value");
        setLoading(false);
        return;
      }

      await updateSale(sales.id, updatedSales);
      toast.success("Sale updated successfully!");
      router.refresh();
      router.push("/sales");
    } catch (error) {
      toast.error("Failed to update sale. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Product Name (read-only) */}
        <div className="space-y-2">
          <Label htmlFor="product_name" className="text-lg font-medium">
            Product Name
          </Label>
          <Input
            id="product_name"
            // value={sales.product.name}
            readOnly
            className=""
            defaultValue={sales.product.name}
          />
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
            defaultValue={sales.price}
            required
          />
        </div>

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
            defaultValue={sales.quantity}
            required
          />
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

          <Link href="/sales" prefetch={true}>
            <Button type="button" variant="outline">
              Back to Sales List
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default SalesForm;