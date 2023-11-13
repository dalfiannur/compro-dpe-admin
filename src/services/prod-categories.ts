import {createApi} from '@reduxjs/toolkit/query/react'
import {PaginationMeta} from '../entities/PaginationMeta';
import {baseQuery} from './base'
import {ProdSeries} from "../entities";

type PaginationResult = {
  data: any,
  meta: PaginationMeta
}

type PaginationQuery = {
  page: number
  perPage: number
}

type ProductResult = {
  data: ProdSeries
}

export const productCategoriesApi = createApi({
  reducerPath: 'productApi',
  baseQuery,
  endpoints: (builder) => ({
    getProductCategoriesPagination: builder.query<PaginationResult, PaginationQuery>({
      query: ({page, perPage}) => {
        const query = new URLSearchParams();
        query.set('page', page.toString());
        query.set('perPage', perPage.toString());
        return {
          url: '/product?' + query.toString(),
        }
      }
    }),
    getProductCategoriesFeatured: builder.query<PaginationResult, any>({
      query: () => ({
        url: '/product/featured?perPage=99'
      }),
    }),
    getProductCategories: builder.query<any, any>({
      query: (slug: string) => ({
        url: `/product/slug/`+ slug,
      }),
    }),
    postProductCategories: builder.mutation<any, any>({
      query: (body) => ({
        url: '/product',
        method: 'POST',
        body
      })
    }),
    putProductCategories: builder.mutation<any, Partial<any> & { id: number }>({
      query: ({id, ...body}) => {
        console.log("Inside putTypeCategory mutation");
        console.log("id:", id);
        console.log("body:", body);

        return {
          url: `/product/${id}`,
          method: 'PUT',
          body
        };
      }
    }),
    deleteProductCategories: builder.mutation<any, number>({
      query: (id) => ({
        url: '/product/' + id,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useGetProductCategoriesPaginationQuery,
  useGetProductCategoriesFeaturedQuery,
  useGetProductCategoriesQuery,
  usePutProductCategoriesMutation,
  usePostProductCategoriesMutation,
  useDeleteProductCategoriesMutation
} = productCategoriesApi;
