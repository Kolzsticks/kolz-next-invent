'use client';

import { DataTable } from '@/components/data-table/data-table';
import { createColumns } from '@/components/data-table/columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
  },
  // Add more sample users...
];

const columns = createColumns({
  columns: [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'status', header: 'Status' },
  ],
});

export default function UsersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}