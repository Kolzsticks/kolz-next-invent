'use client';

import { DataTable } from '@/components/data-table/data-table';
import { createColumns } from '@/components/data-table/columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const groups = [
  {
    id: '1',
    name: 'Admin Group',
    members: 10,
    description: 'Administrators with full access',
  },
  // Add more sample groups...
];

const columns = createColumns({
  columns: [
    { accessorKey: 'name', header: 'Group Name' },
    { accessorKey: 'members', header: 'Members' },
    { accessorKey: 'description', header: 'Description' },
  ],
});

export default function ManageGroupsPage() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Groups</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Group
        </Button>
      </div>
      <DataTable columns={columns} data={groups} />
    </div>
  );
}
