"use client";

import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon, X } from "lucide-react";
import Link from "next/link";
import { useProductsStore } from "@/utils/stores/ProductStore";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { createColumns } from "@/components/data-table/columns";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Product } from "@/types/types";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { StatsCard } from "@/components/StatCard";
import { formatCurrency } from "@/utils/functions";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  const {
    products,
    loading,
    error,
    date,
    totalValue,
    fetchAllProducts,
    fetchProductsByDate,
    clearFilter,
  } = useProductsStore();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleDateSelect = (newDate: Date | undefined) => {
    setCalendarOpen(false);
    if (newDate) fetchProductsByDate(newDate);
  };

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const productColumns: ColumnDef<Product>[] = createColumns({
    columns: [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => row.original.name || "N/A",
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => row.original.category || "N/A",
      },
      {
        accessorKey: "subcategory",
        header: "Subcategory",
        cell: ({ row }) => row.original.subcategory || "N/A",
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => row.original.price || "N/A",
      },
      {
        accessorKey: "venue",
        header: "Venue",
        cell: ({ row }) => row.original.venue || "N/A",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        cell: ({ row }) => row.original.quantity || "N/A",
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => row.original.date || "N/A",
      },
    ],
  });

  if (error) {
    return <ErrorDisplay error={error} onRetry={fetchAllProducts} />;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex items-center gap-2">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                disabled={loading}
              >
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, "PPP") : "Filter by Date"}
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
              onClick={clearFilter}
              disabled={loading}
              className="h-9 w-9"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Link href="/products/add" prefetch={true}>
            <Button disabled={loading}>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatsCard
          title="Total Products"
          value={products.length}
          loading={loading}
        />
        <StatsCard
          title="Total Value"
          value={totalValue}
          loading={loading}
          formatter={formatCurrency}
        />
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
              columns={productColumns}
              data={products}
              filterColumn="name"
              filterPlaceholder="Filter products..."
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
