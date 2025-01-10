import { Product } from "@/types/types";
import moment from "moment"; // Correct way to import moment
import { SalePageType } from "./zod";

export async function fetchProducts() {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${base_url}/api/products`, {
    // next: { revalidate: 60 },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await response.json();

  // Format the date field of each product
  return data.map((product: Product) => ({
    ...product,
    date: moment(product.date).format("MMMM D, YYYY h:mm A"), // Format date
  }));
}


export const fetchSales = async (): Promise<SalePageType[]> => {
    try {
      const base_url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${base_url}/api/sales/views`, {
        cache: "no-store", // Ensures fresh data is fetched
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data: SalePageType[] = await response.json();
      return data.map((sale: SalePageType) => ({
        ...sale,
        date: moment(sale.date).format("MMMM D, YYYY h:mm A"), // Format date
      }));
    } catch (error) {
      console.error("Failed to fetch sales:", error);
      throw new Error("Failed to load sales data. Please try again later.");
    }
  };
  