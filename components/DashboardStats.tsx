"use client";

import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
} from "lucide-react";
import { StatsCard } from "./StatCard";
import { formatCurrency } from "@/utils/functions";
import { DashboardStatsProps } from "@/types/types";

export function DashboardStats({
  salesData,
  productsData,
  isLoading,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatsCard
        title="Total Revenue"
        value={salesData.revenue.current}
        loading={isLoading}
        formatter={formatCurrency}
        icon={DollarSign}
        iconColor="text-emerald-500"
        trend={salesData.revenue.trend}
      />
      
      <StatsCard
        title="Total Items Sold"
        value={salesData.itemsSold.current}
        loading={isLoading}
        icon={ShoppingCart}
        iconColor="text-blue-500"
        trend={salesData.itemsSold.trend}
      />
      
      <StatsCard
        title="Total Products"
        value={productsData.total}
        loading={isLoading}
        icon={Package}
        iconColor="text-purple-500"
      />
      
      {/* <StatsCard
        title="Total Value of Products"
        value={productsData.totalValue}
        loading={isLoading}
        icon={Users}
        iconColor="text-amber-500"
        subtitle="Total inventory value"
      /> */}
    </div>
  );
}
