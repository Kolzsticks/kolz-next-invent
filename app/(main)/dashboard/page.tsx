"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { createColumns } from "@/components/data-table/columns";
import CombinedCharts from "@/components/data-table/combined-charts";
import CookieChecker from "@/components/CheckCookie";
import { useSession } from "next-auth/react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { DashboardStats } from "@/components/DashboardStats";

const highestSellingProducts = [
  { id: 1, product: "Product A", sales: "500", revenue: "$25,000" },
  { id: 2, product: "Product B", sales: "300", revenue: "$15,000" },
];

const latestSales = [
  {
    id: 1,
    date: "2024-01-20",
    customer: "John Doe",
    product: "Product X",
    amount: "$199.99",
    status: "Completed",
  },
  {
    id: 2,
    date: "2024-01-22",
    customer: "Jane Smith",
    product: "Product Y",
    amount: "$299.99",
    status: "Pending",
  },
];

const recentlyAddedProducts = [
  {
    id: 1,
    product: "New Product 1",
    category: "Electronics",
    dateAdded: "2024-01-15",
  },
  {
    id: 2,
    product: "New Product 2",
    category: "Clothing",
    dateAdded: "2024-01-18",
  },
];

const columnsConfig = {
  highestSellingProducts: createColumns({
    columns: [
      { accessorKey: "product", header: "Product" },
      { accessorKey: "sales", header: "Sales" },
      { accessorKey: "revenue", header: "Revenue" },
    ],
  }),
  latestSales: createColumns({
    columns: [
      { accessorKey: "date", header: "Date" },
      { accessorKey: "customer", header: "Customer" },
      { accessorKey: "product", header: "Product" },
      { accessorKey: "amount", header: "Amount" },
      { accessorKey: "status", header: "Status" },
    ],
  }),
  recentlyAddedProducts: createColumns({
    columns: [
      { accessorKey: "product", header: "Product" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "dateAdded", header: "Date Added" },
    ],
  }),
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { isLoading, error, salesData, productsData } = useDashboardData();

  return (
    <div className="space-y-16">
      <h2 className="text-2xl font-bold">
        Welcome back, {session?.user?.username || "Guest"}
      </h2>
      <CookieChecker />

      <DashboardStats
        salesData={salesData}
        productsData={productsData}
        isLoading={isLoading}
      />
      <CombinedCharts />

      {/* Data Tables */}
      <div className="flex flex-col lg:flex-row gap-4 ">
        <Card>
          <CardHeader>
            <CardTitle>Highest Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <DataTable
              columns={columnsConfig.highestSellingProducts}
              data={highestSellingProducts}
            /> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Latest Sales</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <DataTable columns={columnsConfig.latestSales} data={latestSales}/> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recently Added Products</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <DataTable
              columns={columnsConfig.recentlyAddedProducts}
              data={recentlyAddedProducts}
            /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
