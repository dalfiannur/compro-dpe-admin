export interface Article {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  thumbnailUrl: string;
  createdAt: string;
  isFeatured: boolean;
  user: {
    name: string;
  };
}

export interface ArticleDto {
  title: string;
  content: string;
  thumbnail: string;
  isFeatured: boolean;
  tags: string,
}
