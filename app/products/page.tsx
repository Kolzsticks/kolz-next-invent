"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { createColumns } from "@/components/data-table/columns";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Import ShadCN UI Skeleton component
import { Plus } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/Product";

const columns = createColumns({
  columns: [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "subcategory", header: "Subcategory" }, // Handle undefined values
    { accessorKey: "price", header: "Price" },
    { accessorKey: "venue", header: "Venue" },
    { accessorKey: "quantity", header: "Quantity" },
  ],
});

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]); // Products state
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products", { cache: "force-cache" }); // Fetch products from API
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json(); // Parse data
        setProducts(data); // Set products
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        ); // Handle errors
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    // Display Skeleton Loader as a table with 6 columns
    return (
      <div className="flex flex-col items-center justify-center space-y-4 w-full">
        {/* Create a table structure for the skeleton loader */}
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex space-x-4">
            <Skeleton className="h-12 w-[200px]" />
            <Skeleton className="h-12 w-[150px]" />
            <Skeleton className="h-12 w-[150px]" />
            <Skeleton className="h-12 w-[150px]" />
            <Skeleton className="h-12 w-[150px]" />
            <Skeleton className="h-12 w-[150px]" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/products/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={products} />{" "}
      {/* Pass products to DataTable */}
    </div>
  );
}
