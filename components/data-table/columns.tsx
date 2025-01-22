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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ColumnsConfig<T> {
  columns: Array<{
    accessorKey: keyof T | string;
    header: string;
    cell?: (props: { row: { original: T } }) => React.ReactNode;
  }>;
  onDelete?: (id: number) => Promise<{ success: boolean; error?: string }>;
  onDeleteSuccess?: (id: number) => void;
  editUrl?: (id: number) => string;
}

export function createColumns<T extends Record<string, any>>(
  config: ColumnsConfig<T>
): ColumnDef<T>[] {
  const ActionCell = ({ row }: { row: { original: T } }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
      if (config.onDelete) {
        setIsDeleting(true);
        try {
          const result = await config.onDelete(row.original.id);
          if (result.success) {
            config.onDeleteSuccess?.(row.original.id);
            toast.success("Item deleted successfully");
            // router.refresh();
            setIsDeleteDialogOpen(false);
          } else {
            toast.error(result.error || "Failed to delete item");
          }
        } catch (error) {
          toast.error("Failed to delete item");
        } finally {
          setIsDeleting(false);
        }
      }
    };

    return (
      <>
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
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  };

  return [
    ...config.columns.map((col) => ({
      accessorKey: col.accessorKey,
      header: col.header,
      cell: col.cell,
    })),
    {
      id: "actions",
      cell: ActionCell,
    },
  ];
}