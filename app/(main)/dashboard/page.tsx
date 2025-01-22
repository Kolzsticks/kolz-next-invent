"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CombinedCharts from "@/components/data-table/combined-charts";
import CookieChecker from "@/components/CheckCookie";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { DashboardStats } from "@/components/DashboardStats";
import { DashboardData } from "@/types/types";

// Define the type for the dashboard data


export default function DashboardPage() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/trends?period=day");
        const data: DashboardData = await response.json(); // Enforce DashboardData type
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

      <CombinedCharts />

      {/* Data Tables */}
      <div className="flex flex-col lg:flex-row gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Highest Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for the table */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Latest Sales</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for the table */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recently Added Products</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for the table */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
