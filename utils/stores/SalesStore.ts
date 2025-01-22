import { create } from 'zustand'
import { getAllSales } from "@/lib/actions";
import { format } from "date-fns";
import { SalePageType } from "@/lib/zod";

interface SalesState {
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
}

export const useSalesStore = create<SalesState>((set, get) => ({
  sales: [],
  loading: true,
  error: null,
  date: undefined,
  totalSales: 0,
  totalItems: 0,
  averageSale: 0,

  fetchAllSales: async () => {
    set({ loading: true, error: null });
    try {
      const salesData = await getAllSales();
      set({
        sales: salesData,
        loading: false,
        totalSales: salesData.reduce(
          (acc, sale) => acc + Number(sale.price) * sale.quantity,
          0
        ),
        totalItems: salesData.reduce((acc, sale) => acc + sale.quantity, 0),
        averageSale:
          salesData.length > 0
            ? salesData.reduce(
                (acc, sale) => acc + Number(sale.price) * sale.quantity,
                0
              ) / salesData.length
            : 0,
      });
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "An unknown error occurred.",
        loading: false,
      });
    }
  },

  fetchSalesByDate: async (selectedDate) => {
    set({ loading: true, error: null });
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const salesData = await getAllSales(formattedDate);
      set({
        sales: salesData,
        loading: false,
        date: selectedDate,
        totalSales: salesData.reduce(
          (acc, sale) => acc + Number(sale.price) * sale.quantity,
          0
        ),
        totalItems: salesData.reduce((acc, sale) => acc + sale.quantity, 0),
        averageSale:
          salesData.length > 0
            ? salesData.reduce(
                (acc, sale) => acc + Number(sale.price) * sale.quantity,
                0
              ) / salesData.length
            : 0,
      });
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "An unknown error occurred.",
        loading: false,
      });
    }
  },

  clearFilter: () => {
    set({ date: undefined });
    get().fetchAllSales();
  },
}));
