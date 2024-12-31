'use client';

import { DataTable } from '@/components/data-table/data-table';
import { createColumns } from '@/components/data-table/columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const sales = [
  {
    id: '1',
    date: '2024-01-20',
    customer: 'John Doe',
    product: 'Product 1',
    amount: '$199.99',
    status: 'Completed',
  },
  // Add more sample sales...
];

const columns = createColumns({
  columns: [
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'customer', header: 'Customer' },
    { accessorKey: 'product', header: 'Product' },
    { accessorKey: 'amount', header: 'Amount' },
    { accessorKey: 'status', header: 'Status' },
  ],
});

export default function SalesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales</h1>
        <Link href="/sales/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Sale
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={sales} />
    </div>
  );
}