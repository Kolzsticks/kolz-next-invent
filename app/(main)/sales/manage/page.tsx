import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { salesColumns } from "@/components/data-table/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { SalePageType } from "@/lib/zod";

const fetchSales = async (): Promise<SalePageType[]> => {
  try {
    const base_url = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${base_url}/api/sales/views`, {
      cache: "no-store", // Ensures fresh data is fetched
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data: SalePageType[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch sales:", error);
    throw new Error("Failed to load sales data. Please try again later.");
  }
};

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
      <Card>
        <CardContent>
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Sales</h1>
            <Link href="/sales/add" className="mt-2">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Sale
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

          {/* Calendar
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Filter by Date</h2>
            <Calendar />
          </div> */}

          {/* Data Table */}
          <DataTable columns={salesColumns} data={sales} />
        </CardContent>
      </Card>
    </div>
  );
}
