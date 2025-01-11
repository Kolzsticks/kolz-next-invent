'use client';

import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon, X, DollarSign, Package, TrendingUp } from "lucide-react";
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

  // Calculate statistics
  const totalSales = sales.reduce(
    (acc, sale) => acc + Number(sale.price) * sale.quantity,
    0
  );
  const totalItems = sales.reduce(
    (acc, sale) => acc + sale.quantity,
    0
  );
  const averageSale = sales.length > 0 ? totalSales / sales.length : 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Sales Dashboard</h1>
          {date && (
            <p className="text-sm text-muted-foreground mt-1">
              Showing sales for {format(date, 'MMMM d, yyyy')}
            </p>
          )}
        </div>
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
          <Link href="/sales/add" className="ml-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Sale
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
            </div>
            {loading ? (
              <Skeleton className="h-8 w-40 mt-1" />
            ) : (
              <p className="text-2xl font-bold mt-2">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }).format(totalSales)}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground">Items Sold</h3>
            </div>
            {loading ? (
              <Skeleton className="h-8 w-24 mt-1" />
            ) : (
              <p className="text-2xl font-bold mt-2">
                {totalItems.toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground">Average Sale</h3>
            </div>
            {loading ? (
              <Skeleton className="h-8 w-32 mt-1" />
            ) : (
              <p className="text-2xl font-bold mt-2">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }).format(averageSale)}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Data Table Section */}
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <DataTable
              columns={salesColumns}
              data={sales.map((sale) => ({
                ...sale,
                productName: sale.product.name,
              }))}
              filterColumn="productName"
              filterPlaceholder="Filter sales..."
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}