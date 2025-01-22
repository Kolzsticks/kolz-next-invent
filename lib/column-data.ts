'use client'
import { createColumns } from "@/components/data-table/columns";
import { Product, RealUser } from "@/types/types";
import { deleteProduct, deleteSale } from "@/lib/actions";
import { SalePageType } from "@/lib/zod";
import {
  ColumnDef,
} from "@tanstack/react-table";
import { db } from "./db";

export const productColumns: ColumnDef<Product>[] = createColumns({
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
    },
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
      accessorKey: "productName",
      header: "Product Name",
      cell: ({ row }) => row.original.product.name || "N/A",
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

  ],
  onDelete: deleteSale,
  editUrl: (id) => `/sales/edit/${id}`,
});

export const userColumns: ColumnDef<RealUser>[] = createColumns({
  columns: [
    {
      accessorKey: 'username',
      header: 'Username',
      cell: ({ row }) => row.original.username || "N/A"
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => row.original.role || "N/A"
    }
  ],
  onDelete: async (id: number) => {
    try {
      await db.user.delete({
        where: { id }
      });
      return { success: true };
    } catch (error) {
      console.error("Error deleting user:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete user'
      };
    }
  },
  editUrl: (id: number) => `/users/edit/${id}`,
});
