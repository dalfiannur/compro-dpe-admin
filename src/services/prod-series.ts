import {createApi} from '@reduxjs/toolkit/query/react'
import {PaginationMeta} from '../entities/PaginationMeta';
import {ProdSeries, ProductDto} from '../entities/ProdSeries';
import {baseQuery} from './base'

type PaginationResult = {
  data: ProdSeries[],
  meta: PaginationMeta
}

type PaginationQuery = {
  page: number
  perPage: number
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery,
  endpoints: (builder) => ({
    getProductPagination: builder.query<PaginationResult, PaginationQuery>({
      query: ({page, perPage}) => {
        const query = new URLSearchParams();
        query.set('page', page.toString());
        query.set('perPage', perPage.toString());
        return {
          url: '/product?' + query.toString(),
        }
      }
    }),
    postProduct: builder.mutation<ProdSeries, ProductDto>({
      query: (body) => ({
        url: '/product',
        method: 'POST',
        body
      })
    }),
    putProduct: builder.mutation<ProdSeries, Partial<ProductDto> & { id: number }>({
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
    deleteProduct: builder.mutation<ProdSeries, number>({
      query: (id) => ({
        url: '/product/' + id,
        method: 'DELETE'
      })
    })
  })
});

export const {useGetProductPaginationQuery, usePutProductMutation, usePostProductMutation, useDeleteProductMutation} = productApi;
