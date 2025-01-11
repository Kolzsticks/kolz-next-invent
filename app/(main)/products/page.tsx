import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Import ShadCN UI Skeleton component
import { Plus } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/types";
import { columns } from "@/lib/colume-data";
import { getAllProducts } from "@/lib/actions";

export default async function ProductsPage() {
  let products: Product[] = [];
  let error = null;

  try {
    products = await getAllProducts();
  } catch (err) {
    error = err instanceof Error ? err.message : "An unknown error occurred";
  }

  return <ProductsClient products={products} error={error} />;
}

function ProductsClient({
  products,
  error,
}: {
  products: Product[]; // Array of Product objects
  error: string | null; // Error can be a string or null
}) {
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
        <Link href="/products/add" prefetch={true}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={products}
        filterColumn="name"
        filterPlaceholder="Filter products..."
      />
    </div>
  );
}
