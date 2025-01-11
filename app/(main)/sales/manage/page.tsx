'use client';

import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon, X } from "lucide-react";
import Link from "next/link";
import { salesColumns } from "@/lib/colume-data";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { SalePageType } from "@/lib/zod";
import { getAllSales } from "@/lib/actions";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SalesPage() {
  const [sales, setSales] = useState<SalePageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

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
    setCalendarOpen(false);
    if (newDate) {
      fetchSalesByDate(newDate);
    }
  };

  // Handle clear filter
  const handleClearFilter = () => {
    setDate(undefined);
    fetchAllSales();
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
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Filter by Date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {date && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleClearFilter}
                className="h-9 w-9"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Link href="/sales/add" className="ml-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Sale
            </Button>
          </Link>
        </div>
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