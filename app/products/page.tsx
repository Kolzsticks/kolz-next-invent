"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { createColumns } from "@/components/data-table/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/Product";

const columns = createColumns({
  columns: [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "buyPrice", header: "Buy Price" },
    { accessorKey: "salePrice", header: "Sale Price" },
    { accessorKey: "quantity", header: "Quantity" },
    // You can add more columns here based on what data you need.
  ],
});

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);  // State for storing products
  const [loading, setLoading] = useState<boolean>(true);    // State for loading
  const [error, setError] = useState<string | null>(null);   // State for error

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");  // Fetch products from API
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();  // Extract JSON data
        setProducts(data);  // Set the fetched products to state
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");  // Handle errors
      } finally {
        setLoading(false);  // Set loading to false after fetch is complete
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Display loading message
  }

  if (error) {
    return <div>Error: {error}</div>;  // Display error message
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
      <DataTable columns={columns} data={products} />  {/* Pass the fetched products to the DataTable */}
    </div>
  );
}
