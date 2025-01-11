"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";

export function createColumns<T extends Record<string, any>>(config: {
  columns: Array<{
    accessorKey: keyof T | string;
    header: string;
    cell?: (props: { row: { original: T } }) => React.ReactNode;
  }>;
  onDelete?: (id: number) => Promise<void>;
  editUrl?: (id: string) => string;
}): ColumnDef<T>[] {
  return [
    ...config.columns.map((col) => ({
      accessorKey: col.accessorKey,
      header: col.header,
      cell: col.cell,
    })),
    {
      id: "actions",
      cell: ({ row }) => {
        const handleDelete = async () => {
          if (config.onDelete) {
            try {
              await config.onDelete(row.original.id);
              toast.success("Item deleted successfully");
            } catch (error) {
              toast.error("Failed to delete item");
            }
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
              {config.editUrl && (
                <Link href={config.editUrl(row.original.id)} prefetch={true}>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </Link>
              )}
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
