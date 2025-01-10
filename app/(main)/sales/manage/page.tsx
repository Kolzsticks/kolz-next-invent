import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { salesColumns } from "@/lib/colume-data";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { SalePageType } from "@/lib/zod";
import { fetchSales } from "@/lib/functions";

export default async function SalesPage() {
  let sales: SalePageType[] = [];
  let error: string | null = null;

  try {
    sales = await fetchSales();
  } catch (err) {
    error = err instanceof Error ? err.message : "An unknown error occurred.";
  }

  if (error) {
    return (
      <div className="container mx-auto mt-10">
        <Card>
          <CardContent>
            <h1 className="text-lg font-semibold">Error</h1>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate total sales
  const totalSales = sales.reduce(
    (acc, sale) => acc + Number(sale.price) * sale.quantity,
    0
  );

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Sales</h1>
        <Link href="/sales/add" className="mt-2">
          <Button>
            <Plus className="mr-2 h-4 w-4 font-bold text-2xl" /> Add Sale
          </Button>
        </Link>
      </div>

      {/* Total Sales */}
      <p className="mb-4">
        Total Sales:{" "}
        {new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 2,
        }).format(totalSales)}
      </p>

      {/* Data Table */}
      <DataTable
        columns={salesColumns}
        data={sales.map((sale) => ({
          ...sale,
          productName: sale.product.name, // Add the flat property for filtering
        }))}
        filterColumn="productName"
        filterPlaceholder="Filter sales..."
      />
    </div>
  );
}
