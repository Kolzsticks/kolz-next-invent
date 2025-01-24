// stores/productsStore.ts
import { create } from "zustand";
import { format } from "date-fns";
import { Product, ProductsStore } from "@/types/types";
import { getAllProducts } from "@/lib/actions";


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

  // Add this new method
  removeProducts: (deletedProducts: Product[]) => {
    set((state) => {
      const updatedProducts = state.products.filter(
        product => !deletedProducts.some(deleted => deleted.id === product.id)
      );

      const totalValue = updatedProducts.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );

      return {
        products: updatedProducts,
        totalValue
      };
    });
  },
}));
