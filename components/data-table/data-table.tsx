"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChevronDown, Trash2 } from "lucide-react";
import { DataTableProps } from "@/types/types";

// Helper function to get nested object value using dot notation
const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

export function DataTable<TData>({
  columns,
  data,
  onDelete,
  filterColumn = 'name',
  filterPlaceholder = "Filter...",
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Custom filter function that handles nested fields
  const nestedFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
    const value = getNestedValue(row.original, columnId);
    return String(value)
      .toLowerCase()
      .includes(String(filterValue).toLowerCase());
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    filterFns: {
      nested: nestedFilterFn,
    },
  });

  // Get the column for filtering, fallback to first column if not found
  const filterableColumn = table.getColumn(filterColumn);

  // Determine if any rows are selected
  const isAnyRowSelected = Object.keys(rowSelection).length > 0;

  // Handle delete selected rows
  const handleDeleteSelected = () => {
    if (onDelete) {
      const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
      onDelete(selectedRows);
      // Reset row selection after deletion
      table.resetRowSelection();
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder={filterPlaceholder}
          value={(filterableColumn?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            filterableColumn?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
        <div className="flex items-center space-x-2">
          {/* Delete Selected Button */}
          {isAnyRowSelected && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" /> 
                  Delete Selected
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the selected items.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteSelected}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {/* Columns Visibility Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {/* Select All Checkbox */}
                <TableHead>
                  <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
                    aria-label="Select all"
                  />
                </TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="hover:bg-accent">
                    {header.isPlaceholder 
                      ? null 
                      : flexRender(header.column.columnDef.header, header.getContext())
                    }
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow 
                  key={row.id} 
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50 transition-colors"
                >
                  {/* Row Selection Checkbox */}
                  <TableCell>
                    <Checkbox
                      checked={row.getIsSelected()}
                      onCheckedChange={(value) => row.toggleSelected(!!value)}
                      aria-label="Select row"
                    />
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          {table.getSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
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