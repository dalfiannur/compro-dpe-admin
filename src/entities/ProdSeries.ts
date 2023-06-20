import {Category} from "./Category";
import { ProductImage } from "./ProductImage";
import {SkinConcern} from "./SkinConcern";
import {SkinType} from "./SkinType";

export interface ProdSeries {
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
  images: ProductImage[];
}

export interface ProductDto {
  name: string;
  sku: string;
  categorySlug: string;
  skinTypeIds: number[] | string[];
  skinConcernIds: number[] | string[];
  images: string[];
  usedAs: string;
  howToUse: string;
  description: string;
  keyingredient: string;
  isFeatured: boolean;
}
