import { DataTable } from "@/components/data-table/data-table-2";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CategoryColumns } from "@/lib/column-data";
import { getAllCategories, getAllProducts } from "@/lib/actions";

export default async function CategoriesPage() {
  const categories = await getAllCategories(); // ['Beverages', 'Champagne & Wine', ...]
  const products = await getAllProducts(); // [{ id: "1", name: "Product 1", category: "Beverages" }, ...]

  // Group products by category and calculate counts
  const categoryCounts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = 0;
    }
    acc[product.category]++;
    return acc;
  }, {} as Record<string, number>);

  // Transform data for the table
  const tableData = categories.map((name, index) => ({
    id: (index + 1).toString(),
    name,
    products: categoryCounts[name] || 0, // Use the calculated count
    created: new Date().toISOString().split("T")[0],
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>
      <DataTable columns={CategoryColumns} data={tableData} />
    </div>
  );
}
