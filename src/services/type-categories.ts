import {createApi} from '@reduxjs/toolkit/query/react'
import {PaginationMeta} from '../entities/PaginationMeta';
import {baseQuery} from './base'

type PaginationResult = {
  data: any,
  meta: PaginationMeta
}

type PaginationQuery = {
  page: number
  perPage: number
}

export const typeCategoriesApi = createApi({
  reducerPath: 'typeCategoriesApi',
  baseQuery,
  endpoints: (builder) => ({
    getTypeCategoryPagination: builder.query<PaginationResult, PaginationQuery>({
      query: ({page, perPage}) => {
        const query = new URLSearchParams();
        query.set('page', page.toString());
        query.set('perPage', perPage.toString());
        return {
          url: '/categories?' + query.toString(),
        }
      }
    }),
    postTypeCategory: builder.mutation<any, any>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body
      })
    }),
    putTypeCategory: builder.mutation<any, Partial<any> & { id: number }>({
      query: ({id, ...body}) => {
        return {
          url: `/categories/${id}`,
          method: 'PUT',
          body
        };
      }
    }),
    deleteTypeCategory: builder.mutation<any, number>({
      query: (id) => ({
        url: '/categories/' + id,
        method: 'DELETE'
      })
    })
  })
});

export const {useGetTypeCategoryPaginationQuery, usePutTypeCategoryMutation, usePostTypeCategoryMutation, useDeleteTypeCategoryMutation} = typeCategoriesApi;
