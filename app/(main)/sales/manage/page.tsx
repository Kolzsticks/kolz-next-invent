'use client';

import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { salesColumns } from "@/lib/colume-data";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { SalePageType } from "@/lib/zod";
import { getAllSales } from "@/lib/actions";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function SalesPage() {
  const [sales, setSales] = useState<SalePageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);

  // Function to fetch all sales
  const fetchAllSales = async () => {
    setLoading(true);
    setError(null);
    try {
      const salesData = await getAllSales();
      setSales(salesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch sales for a specific date
  const fetchSalesByDate = async (selectedDate: Date) => {
    setLoading(true);
    setError(null);
    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const salesData = await getAllSales(formattedDate);
      setSales(salesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all sales on component mount
  useEffect(() => {
    fetchAllSales();
  }, []);

  // Handle date selection
  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      fetchSalesByDate(newDate);
    } else {
      // If date is cleared, fetch all sales
      fetchAllSales();
    }
  };

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

      {/* Calendar Section */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-lg font-medium">Filter by Date</h2>
          {date && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDateSelect(undefined)}
            >
              Show All Sales
            </Button>
          )}
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="rounded-md border"
        />
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

      {/* Loading State */}
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        /* Data Table */
        <DataTable
          columns={salesColumns}
          data={sales.map((sale) => ({
            ...sale,
            productName: sale.product.name,
          }))}
          filterColumn="productName"
          filterPlaceholder="Filter sales..."
        />
      )}
    </div>
  );
}