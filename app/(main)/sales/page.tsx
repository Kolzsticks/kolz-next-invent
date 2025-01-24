"use client";

import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon, X } from "lucide-react";
import Link from "next/link";
import { salesColumns } from "@/lib/column-data";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSalesStore } from "@/utils/stores/SalesStore";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { StatsCard } from "@/components/StatCard";
import { formatCurrency } from "@/utils/functions";
import { createDeleteHandler } from "@/components/CreateDeleteHandler";
import { Sales } from "@/types/types";
import { deleteSale } from "@/lib/actions";

export default function SalesPage() {
  const {
    sales,
    loading,
    error,
    date,
    totalSales,
    totalItems,
    averageSale,
    fetchAllSales,
    fetchSalesByDate,
    clearFilter,
    removeSales,
  } = useSalesStore();
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Create delete handler
  const handleDeleteSales = createDeleteHandler<Sales>(
    deleteSale,
    "Sales deleted successfully",
    "Failed to delete some sales",
    (deleteSale) => {
      // Update local store after successful deletion
      removeSales(deleteSale);
    }
  );

  // Fetch all sales on component mount
  useEffect(() => {
    fetchAllSales();
  }, []);

  const handleDateSelect = (newDate: Date | undefined) => {
    setCalendarOpen(false);
    if (newDate) fetchSalesByDate(newDate);
  };

  // console.log(date)

  if (error) {
    return <ErrorDisplay error={error} onRetry={fetchAllSales} />;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl font-bold">Sales Dashboard</h1>
          {date && (
            <p className="text-sm text-muted-foreground mt-1">
              Showing sales for {format(date, "MMMM d, yyyy")}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-row items-center lg:items-center gap-3 sm:gap-4 flex-wrap">
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
          <Link href="/sales/add" prefetch={true}>
            <Button disabled={loading}>
              <Plus className="mr-2 h-4 w-4" /> Add Sales
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(totalSales)}
          loading={loading}
        />
        <StatsCard
          title="Total Items Sold"
          value={totalItems}
          loading={loading}
        />

        <StatsCard
          title="Average Sale"
          value={formatCurrency(averageSale)}
          loading={loading}
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
              columns={salesColumns}
              data={sales.map((sale) => ({
                ...sale,
                productName: sale.product.name,
              }))}
              filterColumn="productName"
              filterPlaceholder="Filter sales..."
              onDelete={handleDeleteSales}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
