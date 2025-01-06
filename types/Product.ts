

// Adjust the Product type to match database schema
export interface Product {
  name: string;
  category: string;
  subcategory: string | null;
  price: number;
  venue: string | null;
  quantity: number;
  id: number;
}
