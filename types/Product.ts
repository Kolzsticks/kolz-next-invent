

export interface Product {
  name: string;
  category: string;
  subcategory?: string; // Use `string | undefined` to allow optional values
  price: number;
  venue: string;
  quantity: number;
}
