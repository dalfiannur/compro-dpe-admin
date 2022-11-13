import { Product } from "./Product";

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  thumbnailUrl: string;
  createdAt: string;
  isFeatured: boolean;
  user: {
    name: string;
  };
  products: Product[];
}

export interface ArticleDto {
  title: string;
  content: string;
  thumbnail: string;
  isFeatured: boolean;
  // tags: string,
}
