'use client';

import { DataTable } from '@/components/data-table/data-table';
import { createColumns } from '@/components/data-table/columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const categories = [
  {
    id: '1',
    name: 'Electronics',
    products: '150',
    created: '2024-01-15',
  },
  // Add more sample categories...
];

const columns = createColumns({
  columns: [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'products', header: 'Products' },
    { accessorKey: 'created', header: 'Created Date' }
  ],
});

export default function CategoriesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>
      <DataTable columns={columns} data={categories} />
    </div>
  );
}