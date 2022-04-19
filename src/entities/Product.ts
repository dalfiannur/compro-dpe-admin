import { Category } from "./Category";
import { SkinConcern } from "./SkinConcern";
import { SkinType } from "./SkinType";

export interface Product {
  id: number;
  name: string;
  sku: string
  slug: string;
  category: Category;
  skinTypes: SkinType[];
  skinConcerns: SkinConcern[]
  isFeatured: boolean;
  usedAs: string;
  howToUse: string;
  description: string;
  keyingredient: string;
  createdAt: string;
}

export interface ProductDto {
  name: string;
  sku: string;
  categorySlug: string;
  skinTypeIds: number[];
  skinConcernIds: number[];
  images: string[];
  usedAs: string;
  howToUse: string;
  description: string;
  keyingredient: string;
  isFeatured: boolean;
}
