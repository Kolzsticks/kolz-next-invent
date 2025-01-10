import { ColumnDef } from "@tanstack/react-table";


export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  filterColumn?: string;
  filterPlaceholder?: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  venue: string;
  quantity: number;
  date: string;
}


export interface Sales {
  id: number;
  product_id: number;
  price: number;
  quantity: number;
  date: string;
}