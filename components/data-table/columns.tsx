"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { deleteProduct } from "@/lib/actions";
import { toast } from "sonner"; // Import toast for success notifications

export function createColumns<T extends Record<string, any>>(config: {
  columns: Array<{
    accessorKey: keyof T;
    header: string;
  }>;
}): ColumnDef<T>[] {
  return [
    ...config.columns.map((col) => ({
      accessorKey: col.accessorKey as string,
      header: col.header,
    })),
    {
      id: "actions",
      cell: ({ row }) => {
        const handleDelete = async () => {
          try {
            await deleteProduct(row.original.id); // Assuming deleteProduct is an async function
            toast.success("Product deleted successfully");
          } catch (error) {
            toast.error("Failed to delete product");
            // console.error("Failed to delete product", error);
          }
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link
                className="cursor-pointer"
                href={`/products/edit/${row.original.id}`}
              >
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <span onClick={handleDelete}>
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </span>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
