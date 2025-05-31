import { Category } from './../categories/category';
export interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  categoryId?: number;
  category?: Category;
  images: string[];
}
