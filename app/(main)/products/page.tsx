"use client";

import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Calendar as CalendarIcon, X, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/types";
import { columns } from "@/lib/column-data";
import { deleteProduct, getAllProducts } from "@/lib/actions";
import { Calendar } from "@/components/ui/calendar";
import { useCallback, useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createColumns } from "@/components/data-table/columns";
import { ColumnDef } from "@tanstack/react-table";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductsByDate = useCallback(async (selectedDate: Date) => {
    setLoading(true);
    setError(null);
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const productsData = await getAllProducts(formattedDate);
      setProducts(productsData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setCalendarOpen(false);
    if (newDate) {
      fetchProductsByDate(newDate);
    }
  };

  const handleClearFilter = () => {
    setDate(undefined);
    fetchAllProducts();
  };

  // Handle successful deletion
  const handleDeleteSuccess = useCallback((deletedId: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== deletedId)
    );
  }, []);

  // Create columns with delete handler
  const productColumns: ColumnDef<Product>[] = useMemo(
    () =>
      createColumns({
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
          }, // Handle undefined values
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
        onDelete: deleteProduct,
        onDeleteSuccess: handleDeleteSuccess,
        editUrl: (id) => `/products/edit/${id}`,
      }),
    [handleDeleteSuccess]
  );

  if (error) {
    return (
      <div className="container mx-auto mt-10">
        <Card className="bg-destructive/10">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold">
                  Error Loading Products
                </h1>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
              <Button onClick={fetchAllProducts} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalValue = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

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
              onClick={handleClearFilter}
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
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Products
            </h3>
            {loading ? (
              <Skeleton className="h-8 w-24 mt-1" />
            ) : (
              <p className="text-2xl font-bold">{products.length}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Value
            </h3>
            {loading ? (
              <Skeleton className="h-8 w-40 mt-1" />
            ) : (
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(totalValue)}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="space-y-4">
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
