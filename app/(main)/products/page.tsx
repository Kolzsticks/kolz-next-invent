import { columns, DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Import ShadCN UI Skeleton component
import { Plus } from "lucide-react";
import Link from "next/link";
import * as moment from "moment"; // Import moment for date formatting
import { Product } from "@/types/Product";

// Server Component
async function fetchProducts() {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${base_url}/api/products`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  // Format the date field of each product
  return data.map((product: Product[]) => ({
    ...product,
    date: moment(product.date).format("MMMM D, YYYY h:mm A"), // Example: "January 6, 2025 2:32 PM"
  }));
}

export default async function ProductsPage() {
  let products = [];
  let error = null;

  try {
    products = await fetchProducts();
  } catch (err) {
    error = err instanceof Error ? err.message : "An unknown error occurred";
  }

  return <ProductsClient products={products} error={error} />;
}

// Client Component
function ProductsClient({ products, error }) {
  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 w-full">
        {/* Skeleton Loader for empty products */}
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
      <DataTable columns={columns} data={products} />
    </div>
  );
}
