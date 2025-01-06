

// Adjust the Product type to match database schema
export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string | null;
  price: number;
  venue: string | null;
  quantity: number;
  image_url?: string | null;
  date?: Date | null;
}