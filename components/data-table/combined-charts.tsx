"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Loader2 } from "lucide-react"; // Import ShadCN UI loader icon

interface CombinedChartsProps {
  salesData: { month: string; sales: number; revenue: number }[];
  productData: { category: string; count: number }[];
  period: string;
  isLoading: boolean; // Add isLoading as prop
}

const salesConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const productConfig = {
  count: {
    label: "Products",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function CombinedCharts({
  salesData,
  productData,
  period,
  isLoading,
}: CombinedChartsProps) {
  return (
    <div className="flex lg:flex-row flex-col gap-6 w-full">
      {/* Sales Overview Area Chart */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>{period}</CardDescription> {/* Use dynamic period */}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
            </div>
          ) : (
            <ChartContainer config={salesConfig}>
              <AreaChart
                data={salesData}
                margin={{ left: 12, right: 12 }}
                width={undefined}
                height={300}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="sales"
                  type="natural"
                  fill="var(--color-sales)"
                  fillOpacity={0.4}
                  stroke="var(--color-sales)"
                />
                <Area
                  dataKey="revenue"
                  type="natural"
                  fill="var(--color-revenue)"
                  fillOpacity={0.4}
                  stroke="var(--color-revenue)"
                />
              </AreaChart>
            </ChartContainer>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                {period} {/* Show the dynamic period */}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Product Distribution Bar Chart */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Product Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
            </div>
          ) : (
            <ChartContainer config={productConfig}>
              <BarChart data={productData} width={undefined} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="count" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
