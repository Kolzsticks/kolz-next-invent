"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createColumns } from "@/components/data-table/columns";
import { Product } from "@/types/Product";
import { SalePageType } from "@/lib/zod";
import { deleteProduct, deleteSale } from "@/lib/actions";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]; // Column definitions typed to match TData
  data: TData[]; // Data array typed as TData
}

export const columns: ColumnDef<Product>[] = createColumns({
  columns: [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original.name || "N/A",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => row.original.category || "N/A",
    },
    {
      accessorKey: "subcategory",
      header: "Subcategory",
      cell: ({ row }) => row.original.subcategory || "N/A",
    }, // Handle undefined values
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => row.original.price || "N/A",
    },
    {
      accessorKey: "venue",
      header: "Venue",
      cell: ({ row }) => row.original.venue || "N/A",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => row.original.quantity || "N/A",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => row.original.date || "N/A",
    },
  ],
  onDelete: deleteProduct,
  editUrl: (id) => `/products/edit/${id}`,
});

export const salesColumns: ColumnDef<SalePageType>[] = createColumns({
  columns: [
    {
      accessorKey: "product",
      header: "Product Name",
      cell: ({ row }) => row.original.product?.name || "N/A",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => row.original.quantity,
    },
    {
      accessorKey: "price",
      header: "Sale Price",
      cell: ({ row }) => row.original.price,
    },
    {
      accessorKey: "date",
      header: "Sale Date",
      cell: ({ row }) => row.original.date,
    },
    {
      accessorKey: "product",
      header: "Category",
      cell: ({ row }) => row.original.product?.category || "N/A",
    },
  ],
  onDelete: deleteSale,
  editUrl: (id) => `/sales/edit/${id}`,
});

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
