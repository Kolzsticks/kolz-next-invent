// stores/productsStore.ts
import { create } from "zustand";
import { format } from "date-fns";
import { Product } from "@/types/types";
import { deleteProduct, getAllProducts } from "@/lib/actions";

interface ProductsStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  date: Date | undefined;
  totalValue: number;
  fetchAllProducts: () => Promise<void>;
  fetchProductsByDate: (selectedDate: Date) => Promise<void>;
  clearFilter: () => void;
  handleDeleteSuccess: (deletedId: number) => void;
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  date: undefined,
  totalValue: 0, // Initialize totalValue

  fetchAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await getAllProducts();
      const totalValue = products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
      set({ products, totalValue });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "An unknown error occurred",
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchProductsByDate: async (selectedDate) => {
    set({ loading: true, error: null });
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const products = await getAllProducts(formattedDate);
      const totalValue = products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
      set({ products, date: selectedDate, totalValue });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "An unknown error occurred",
      });
    } finally {
      set({ loading: false });
    }
  },

  clearFilter: () => {
    set({ date: undefined });
    get().fetchAllProducts();
  },

  handleDeleteSuccess: (deletedId) => {
    set((state) => {
      const updatedProducts = state.products.filter(
        (product) => product.id !== deletedId
      );
      const totalValue = updatedProducts.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
      return { products: updatedProducts, totalValue };
    });
  },
}));
