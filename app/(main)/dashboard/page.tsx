"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CombinedCharts from "@/components/data-table/combined-charts";
import CookieChecker from "@/components/CheckCookie";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { DashboardData } from "@/types/types";
import { DashboardStats } from "@/components/DashboardStats";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/trends?period=month");
        const data: DashboardData = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Transforming `dashboardData` for charts
  const salesData = dashboardData
    ? [
        {
          month: "Current",
          sales: dashboardData.itemsSold.current,
          revenue: dashboardData.revenue.current,
        },
        {
          month: "Previous",
          sales: dashboardData.itemsSold.previous,
          revenue: dashboardData.revenue.previous,
        },
      ]
    : [];

  const productData = dashboardData?.products
    ? [
        { category: "Total Products", count: dashboardData.products.total },
        { category: "Total Value", count: dashboardData.products.totalValue },
      ]
    : [];

    const categoryData = dashboardData?.categories
    ? dashboardData.categories.map((category) => ({
        category: category.name,
        count: category.productCount, // Use productCount instead of count
      }))
    : [];
  

  return (
    <div className="space-y-16">
      <h2 className="text-2xl font-bold">
        Welcome back, {session?.user?.username || "Guest"}
      </h2>
      <CookieChecker />
      {/* Pass loading state and data directly to DashboardStats */}
      <DashboardStats
        salesData={{
          revenue: dashboardData?.revenue ?? {
            current: 0,
            previous: 0,
            trend: { value: 0, timespan: "", direction: "none" },
          },
          itemsSold: dashboardData?.itemsSold ?? {
            current: 0,
            previous: 0,
            trend: { value: 0, timespan: "", direction: "none" },
          },
        }}
        productsData={{
          total: dashboardData?.products?.total ?? 0,
          totalValue: dashboardData?.products?.totalValue ?? 0,
        }}
        isLoading={isLoading}
      />

      {/* Pass loading state and data directly to CombinedCharts */}
      <CombinedCharts salesData={salesData} productData={categoryData} />

      {/* Data Tables */}
      <div className="flex flex-col lg:flex-row gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Highest Selling Products</CardTitle>
          </CardHeader>
          <CardContent>{/* Placeholder for the table */}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Latest Sales</CardTitle>
          </CardHeader>
          <CardContent>{/* Placeholder for the table */}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recently Added Products</CardTitle>
          </CardHeader>
          <CardContent>{/* Placeholder for the table */}</CardContent>
        </Card>
      </div>
    </div>
  );
}
