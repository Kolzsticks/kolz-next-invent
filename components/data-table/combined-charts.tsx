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

const salesData = [
  { month: "January", sales: 1200, revenue: 1500 },
  { month: "February", sales: 1400, revenue: 1800 },
  { month: "March", sales: 1300, revenue: 1700 },
  { month: "April", sales: 1500, revenue: 2000 },
  { month: "May", sales: 1600, revenue: 2100 },
  { month: "June", sales: 1800, revenue: 2400 },
];

const productData = [
  { category: "Electronics", count: 400 },
  { category: "Furniture", count: 300 },
  { category: "Clothing", count: 500 },
  { category: "Books", count: 250 },
  { category: "Accessories", count: 350 },
];

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

export function CombinedCharts() {
  return (
    <div className="flex lg:flex-row flex-col gap-6 w-full">
      {/* Sales Overview Area Chart */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={salesConfig}>
            <AreaChart
              accessibilityLayer
              data={salesData}
              margin={{ left: 12, right: 12 }}
              width={undefined} // Optional if using responsive wrapper
              height={300} // Adjust as needed
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
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
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Product Distribution Bar Chart */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Product Distribution</CardTitle>
          <CardDescription>By Category</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={productConfig}>
            <BarChart
              accessibilityLayer
              data={productData}
              margin={{ left: 12, right: 12 }}
              width={undefined} // Optional if using responsive wrapper
              height={300} // Adjust as needed
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="count"
                fill="hsl(var(--chart-2))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Inventory overview <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Categories distribution in the inventory
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CombinedCharts;
