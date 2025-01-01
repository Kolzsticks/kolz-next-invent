'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Package, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { DataTable } from '@/components/data-table/data-table';
import { createColumns } from '@/components/data-table/columns';

const salesData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const productData = [
  { name: 'Electronics', value: 40 },
  { name: 'Clothing', value: 30 },
  { name: 'Books', value: 20 },
  { name: 'Food', value: 27 },
  { name: 'Sports', value: 18 },
];

const highestSellingProducts = [
  { id: 1, product: 'Product A', sales: '500', revenue: '$25,000' },
  { id: 2, product: 'Product B', sales: '300', revenue: '$15,000' },
];

const latestSales = [
  { id: 1, date: '2024-01-20', customer: 'John Doe', product: 'Product X', amount: '$199.99', status: 'Completed' },
  { id: 2, date: '2024-01-22', customer: 'Jane Smith', product: 'Product Y', amount: '$299.99', status: 'Pending' },
];

const recentlyAddedProducts = [
  { id: 1, product: 'New Product 1', category: 'Electronics', dateAdded: '2024-01-15' },
  { id: 2, product: 'New Product 2', category: 'Clothing', dateAdded: '2024-01-18' },
];

const columnsConfig = {
  highestSellingProducts: createColumns({
    columns: [
      { accessorKey: 'product', header: 'Product' },
      { accessorKey: 'sales', header: 'Sales' },
      { accessorKey: 'revenue', header: 'Revenue' },
    ],
  }),
  latestSales: createColumns({
    columns: [
      { accessorKey: 'date', header: 'Date' },
      { accessorKey: 'customer', header: 'Customer' },
      { accessorKey: 'product', header: 'Product' },
      { accessorKey: 'amount', header: 'Amount' },
      { accessorKey: 'status', header: 'Status' },
    ],
  }),
  recentlyAddedProducts: createColumns({
    columns: [
      { accessorKey: 'product', header: 'Product' },
      { accessorKey: 'category', header: 'Category' },
      { accessorKey: 'dateAdded', header: 'Date Added' },
    ],
  }),
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Product Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Tables */}
      <div className="flex flex-col lg:flex-row gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Highest Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columnsConfig.highestSellingProducts}
              data={highestSellingProducts}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Latest Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columnsConfig.latestSales} data={latestSales} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recently Added Products</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columnsConfig.recentlyAddedProducts}
              data={recentlyAddedProducts}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
