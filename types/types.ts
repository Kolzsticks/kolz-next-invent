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


export // Omit 'id' and 'date' since they shouldn't be updated
  type UpdateProductData = Omit<Product, 'id' | 'date'>;



  // types.ts
export interface UserCredentials {
  username: string;
  password: string;
}

export interface APIResponse {
  success: boolean;
  access_token: string;
  username: string;
  role: string;
  message?: string;
}

export interface RealUser {
  id: string;
  username: string;
  role: string;
}