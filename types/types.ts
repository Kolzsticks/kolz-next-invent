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
  subcategory?: string; // Optional property
  price: number;
  venue: string;
  quantity: number;
  date: string; // Date as a formatted string
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
  id: number;
  name: string;
  username: string;
  password: string;
  role: string;
}


export type CreateUserInput = Omit<RealUser, 'id'>;


export interface EditUserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export interface EditUserFormProps {
  user: RealUser;
}

export interface DashboardData {
  revenue: {
    current: number;
    previous: number;
    trend: {
      value: number;
      timespan: string;
      direction: "up" | "down" | "none";
    };
  };
  itemsSold: {
    current: number;
    previous: number;
    trend: {
      value: number;
      timespan: string;
      direction: "up" | "down" | "none";
    };
  };
  products: {
    total: number;
    totalValue: number;
  };
}


export interface DashboardStatsProps {
  salesData: {
    revenue: {
      current: number;
      previous: number;
      trend: {
        value: number;
        timespan: string;
        direction: "up" | "down" | "none"; // Direction of trend
      };
    };
    itemsSold: {
      current: number;
      previous: number;
      trend: {
        value: number;
        timespan: string;
        direction: "up" | "down" | "none";
      };
    };
  };
  productsData: {
    total: number;
    totalValue: number;
  };
  isLoading: boolean;
}




export interface TrendData {
  currentValue: number;
  previousValue: number;
  timespan: 'day' | 'week' | 'month' | 'year';
}

export interface TrendResult {
  value: number;
  timespan: string;
  direction: 'up' | 'down' | 'none';
}

export type Period = 'day' | 'week' | 'month' | 'year';
