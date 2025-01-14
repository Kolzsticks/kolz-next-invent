"use client";

import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users 
} from "lucide-react";
import { StatsCard } from "./StatCard";
import { formatCurrency } from "@/utils/functions";
import { calculateTrend, getPreviousPeriodValue } from "./CheckTrend";
import { DashboardStatsProps } from "@/types/types";

export function DashboardStats({
  salesData,
  productsData,
  isLoading
}: DashboardStatsProps) {
  // Calculate revenue trend
  const revenueTrend = calculateTrend({
    currentValue: salesData.totalSales,
    previousValue: getPreviousPeriodValue(salesData.sales, 'date', 'amount', 'month'),
    timespan: 'month'
  });

  // Calculate items sold trend
  const itemsSoldTrend = calculateTrend({
    currentValue: salesData.totalItems,
    previousValue: getPreviousPeriodValue(salesData.sales, 'date', 'quantity', 'week'),
    timespan: 'week'
  });

  // Calculate products trend
  const productsTrend = calculateTrend({
    currentValue: productsData.products.length,
    previousValue: getPreviousPeriodValue(productsData.products, 'dateAdded', 'id', 'month'),
    timespan: 'month'
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Revenue"
        value={salesData.totalSales}
        loading={isLoading}
        formatter={formatCurrency}
        icon={DollarSign}
        iconColor="text-emerald-500"
        trend={revenueTrend}
      />
      
      <StatsCard
        title="Total Items Sold"
        value={salesData.totalItems}
        loading={isLoading}
        icon={ShoppingCart}
        iconColor="text-blue-500"
        trend={itemsSoldTrend}
      />
      
      <StatsCard
        title="Total Products"
        value={productsData.products.length}
        loading={isLoading}
        icon={Package}
        iconColor="text-purple-500"
        trend={productsTrend}
      />
      
      <StatsCard
        title="Active Products"
        value={productsData.products.filter(p => p.status === 'active').length}
        loading={isLoading}
        icon={Users}
        iconColor="text-amber-500"
        subtitle="Currently active products"
      />
    </div>
  );
}