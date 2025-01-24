import { DataTable } from "@/components/data-table/data-table-2";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { userColumns } from "@/lib/column-data";
import { getAllUsers } from "@/lib/actions";
import { auth } from "@/auth";
import AccessDenied from "@/components/AccessDenied";

export default async function UsersPage() {
  // Fetch the session to check the user's role
  const session = await auth();

  // Check if the user is an admin, if not show a restriction message
  if (!session || session.user.role !== "admin") {
    return <AccessDenied />;
  }

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
      <DataTable columns={userColumns} data={users} filterColumn="username" />
    </div>
  );
}
