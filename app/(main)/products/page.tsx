"use client";

import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Calendar as CalendarIcon, X } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/types";
import { columns } from "@/lib/colume-data";
import { getAllProducts } from "@/lib/actions";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Function to fetch all products
  const fetchAllProducts = async () => {
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
  };

  // Function to fetch products for a specific date
  const fetchProductsByDate = async (selectedDate: Date) => {
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
  };

  // Fetch all products on component mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Handle date selection
  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setCalendarOpen(false);
    if (newDate) {
      fetchProductsByDate(newDate);
    }
  };

  // Handle clear filter
  const handleClearFilter = () => {
    setDate(undefined);
    fetchAllProducts();
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

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex items-center gap-2">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
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
              className="h-9 w-9"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Link href="/products/add" prefetch={true}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-gray-500">
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
            <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
            {loading ? (
              <Skeleton className="h-8 w-40 mt-1" />
            ) : (
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(
                  products.reduce(
                    (acc, product) => acc + product.price * product.quantity,
                    0
                  )
                )}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Products Table Section */}
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
        <DataTable
          columns={columns}
          data={products}
          filterColumn="name"
          filterPlaceholder="Filter products..."
        />
      )}
    </div>
  );
}
