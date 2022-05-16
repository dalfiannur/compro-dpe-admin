import { createApi } from "@reduxjs/toolkit/query/react";
import { Article, ArticleDto } from "entities";
import { baseQuery } from "./base";

type GetArticlesQuery = {
  page: number;
  perPage: number;
};

type GetArticlesResult = {
  data: Article[];
  meta: {
    total: number;
    per_page: number;
  };
};

type PostArticleResult = {};

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery,
  endpoints: (builder) => ({
    getArticles: builder.query<GetArticlesResult, GetArticlesQuery>({
      query: ({ page = 1, perPage = 10 }) => {
        const query = new URLSearchParams();
        query.set("page", page.toString());
        query.set("perPage", perPage.toString());
        return {
          url: "articles?" + query.toString(),
        };
      },
    }),
    postArticle: builder.mutation<PostArticleResult, ArticleDto>({
      query: (body) => ({
        url: "articles",
        method: "POST",
        body,
      }),
    }),
    deleteArticle: builder.mutation<any, number>({
      query: (id) => ({
        url: "articles/" + id,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  usePostArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
