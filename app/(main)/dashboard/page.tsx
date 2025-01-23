"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { DashboardData } from "@/types/types";
import { DashboardStats } from "@/components/DashboardStats";
import { CombinedCharts } from "@/components/data-table/combined-charts";
import CookieChecker from "@/components/CheckCookie";
import { Button } from "@/components/ui/button"; // ShadCN UI Button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState("month"); // Add state for period

  // Fetch data based on selected period
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Show loader
        const response = await fetch(`/api/trends?period=${period}`);
        const data: DashboardData = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false); // Hide loader
      }
    };

    fetchData();
  }, [period]); // Trigger fetch when period changes

  // Handle period change (e.g., dropdown or buttons)
  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };

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
        count: category.productCount,
      }))
    : [];

  // Define the period label dynamically based on the selected period
  const periodLabel = period === "month" ? "This Month" : period === "year" ? "This Year" : "Custom Period";

  return (
    <div className="space-y-16">
      <h2 className="text-2xl font-bold">
        Welcome back, {session?.user?.username || "Guest"}
      </h2>
      <CookieChecker />

      {/* Period Selection - ShadCN UI Buttons */}
      <div className="flex space-x-4">
        <Button variant={period === "day" ? "outline" : "default"} onClick={() => handlePeriodChange("day")}>Day</Button>
        <Button variant={period === "month" ? "outline" : "default"} onClick={() => handlePeriodChange("month")}>Month</Button>
        <Button variant={period === "year" ? "outline" : "default"} onClick={() => handlePeriodChange("year")}>Year</Button>
      </div>

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
      <CombinedCharts
        salesData={salesData}
        productData={categoryData}
        period={periodLabel} // Pass the dynamic period label
        isLoading={isLoading} // Pass loader state
      />

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
