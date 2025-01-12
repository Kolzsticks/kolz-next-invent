
import { DataTable } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { userColumns } from '@/lib/column-data';
import { getAllUsers } from '@/lib/actions';


export default async function UsersPage() {
  // Fetch users with error handling
  const users = await getAllUsers();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
      <DataTable columns={userColumns} data={users} filterColumn='username' />
    </div>
  );
}