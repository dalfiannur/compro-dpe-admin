import { ProdSeries } from "./ProdSeries";

export interface Article {
  id: number;
  title: string;
  slug: string;
  tags: Tags[];
  content: string;
  thumbnail: string;
  thumbnailUrl: string;
  createdAt: string;
  isFeatured: boolean;
  user: {
    id: number;
    name: string;
  };
  products: ProdSeries[];
}

export interface ArticleDto {
  title: string;
  content: string;
  thumbnail: string;
  isFeatured: boolean;
  authorId: number;
  tags: number[] | string[],
}

export interface Tags {
  id: number;
  name: string;
}