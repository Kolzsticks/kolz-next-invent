'use client';

import { DataTable } from '@/components/data-table/data-table';
import { createColumns } from '@/components/data-table/columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const products = [
  {
    id: '1',
    name: 'Product 1',
    sku: 'SKU001',
    price: '$99.99',
    quantity: '50',
    status: 'In Stock',
  },
  // Add more sample products...
];

const columns = createColumns({
  columns: [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'sku', header: 'SKU' },
    { accessorKey: 'price', header: 'Price' },
    { accessorKey: 'quantity', header: 'Quantity' },
    { accessorKey: 'status', header: 'Status' },
  ],
});

export default function ProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/products/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={products} />
    </div>
  );
}