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

type GetArticleResult = {
  data: Article;
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
    getArticle: builder.query<GetArticleResult, any>({
      query: (slug: string) => ({
        url: "articles/" + slug,
      }),
    }),
    postArticle: builder.mutation<PostArticleResult, ArticleDto>({
      query: (body) => ({
        url: "articles",
        method: "POST",
        body,
      }),
    }),
    putArticle: builder.mutation<
      PostArticleResult,
      ArticleDto & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: "articles/" + id,
        method: "PUT",
        body,
      }),
    }),
    deleteArticle: builder.mutation<any, number>({
      query: (id) => ({
        url: "articles/" + id,
        method: "DELETE",
      }),
    }),
    postRelatedProductOnArticle: builder.mutation<any, any>({
      query: ({ id, productIds }) => ({
        url: "articles/" + id + "/products",
        method: "POST",
        body: { productIds },
      }),
    }),
    deleteRelatedProductOnArticle: builder.mutation<any, any>({
      query: ({ id, productId }) => ({
        url: "articles/" + id + "/products/" + productId,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  usePostArticleMutation,
  useDeleteArticleMutation,
  usePutArticleMutation,
  useLazyGetArticleQuery,
  usePostRelatedProductOnArticleMutation,
  useDeleteRelatedProductOnArticleMutation
} = articleApi;
