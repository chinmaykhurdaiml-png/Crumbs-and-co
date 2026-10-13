export type ProductCategory = 
  | 'all'
  | 'cakes'
  | 'croissants'
  | 'bread'
  | 'cookies'
  | 'pastries'
  | 'cupcakes';

export interface Product {
  id: string;
  name: string;
  category: 'cakes' | 'croissants' | 'bread' | 'cookies' | 'pastries' | 'cupcakes';
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  image: string;
  weightOrSize: string;
  badge?: 'Bestseller' | "Chef's Pick" | 'Seasonal Special' | 'Morning Fresh';
  rating: number;
  reviewCount: number;
  isEggless?: boolean;
  ingredients: string[];
  bakingSchedule: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  description: string;
}
