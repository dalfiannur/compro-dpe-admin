import {createApi} from '@reduxjs/toolkit/query/react'
import {PaginationMeta} from '../entities/PaginationMeta';
import {Product, ProductDto} from '../entities/Product';
import {baseQuery} from './base'

type PaginationResult = {
  data: Product[],
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
    postProduct: builder.mutation<Product, ProductDto>({
      query: (body) => ({
        url: '/product',
        method: 'POST',
        body
      })
    }),
    putProduct: builder.mutation<Product, Partial<ProductDto> & { id: number }>({
      query: ({id, ...body}) => ({
        url: `/product/${id}`,
        method: 'PUT',
        body
      })
    }),
    deleteProduct: builder.mutation<Product, number>({
      query: (id) => ({
        url: '/product/' + id,
        method: 'DELETE'
      })
    })
  })
});

export const {useGetProductPaginationQuery, usePutProductMutation, usePostProductMutation, useDeleteProductMutation} = productApi;
