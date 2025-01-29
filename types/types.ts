import { SalePageType } from "@/lib/zod";
import { ColumnDef } from "@tanstack/react-table";


export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  onDelete?: (selectedRows: TData[]) => void | Promise<void>;
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


export interface EditSaleType {
  id: number;
  product_id: number;
  price: number;
  quantity: number;
  date: string;
  product: {
    id: number;
    name: string;
    subcategory: string | null;
    venue: string | null;
    image_url: string | null;
    price: number;
    // Add other product fields as needed
  };
}
export interface CloudinaryResource {
  context?: {
    alt?: string;
    caption?: string;
  };
  public_id: string;
  secure_url: string;
}


export // Omit 'id' and 'date' since they shouldn't be updated
  type UpdateProductData = Omit<Product, 'id' | 'date'>;

export type updateSaleData = Omit<Sales, 'id' | 'date'>;

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
  categories: {
    id: number;
    name: string;
    productCount: number;
    subcategories: {
      id: number;
      name: string;
    }[];
  }[];
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


export interface SalesState {
  sales: SalePageType[];
  loading: boolean;
  error: string | null;
  date: Date | undefined;
  totalSales: number;
  totalItems: number;
  averageSale: number;
  fetchAllSales: () => Promise<void>;
  fetchSalesByDate: (date: Date) => Promise<void>;
  clearFilter: () => void;
  removeSales: (deletedSales: Sales[]) => void;
}


export interface ProductsStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  date: Date | undefined;
  totalValue: number;
  fetchAllProducts: () => Promise<void>;
  fetchProductsByDate: (selectedDate: Date) => Promise<void>;
  clearFilter: () => void;
  handleDeleteSuccess: (deletedId: number) => void;
  removeProducts: (deletedProducts: Product[]) => void; // Add this line
}
