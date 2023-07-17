import {Category} from "./Category";
import { ProductImage } from "./ProductImage";
import {SkinConcern} from "./SkinConcern";
import {SkinType} from "./SkinType";
import Series from "../pages/TypeList/Series";
import * as y from "yup";

export interface ProdSeries {
  featuredImageUrl: string;
  id: number;
  name: string;
  sku: string
  slug: string;
  seriesId: number;
  seriesSlug: string;
  category: Category;
  categoryId: number;
  categorySlug: string;
  skinTypes: SkinType[];
  skinConcerns: SkinConcern[]
  isFeatured: boolean;
  usedAs: string;
  howToUse: string;
  description: string;
  keyingredient: string;
  createdAt: string;
  featuredImage: string;
  images: ProductImage[];
}

export interface ProductDto {
  name: string;
  sku: string;
  seriesId: number;
  categoryId: number;
  skinTypeIds: number[] | string[];
  skinConcernIds: number[] | string[];
  images: string[];
  usedAs: string;
  howToUse: string;
  description: string;
  keyingredient: string;
  isFeatured: boolean;
}
