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

export const typeSeriesApi = createApi({
  reducerPath: 'typeSeriesApi',
  baseQuery,
  endpoints: (builder) => ({
    getTypeSeriesPagination: builder.query<PaginationResult, PaginationQuery>({
      query: ({page, perPage}) => {
        const query = new URLSearchParams();
        query.set('page', page.toString());
        query.set('perPage', perPage.toString());
        return {
          url: '/series?' + query.toString(),
        }
      }
    }),
    getTypeSeries: builder.query<PaginationResult, any>({
      query: () => {
        const query = new URLSearchParams();
        return {
          url: '/series?' + query.toString(),
        }
      }
    }),
    postTypeSeries: builder.mutation<any, any>({
      query: (body) => ({
        url: '/series',
        method: 'POST',
        body
      })
    }),
    putTypeSeries: builder.mutation<any, Partial<any> & { id: number }>({
      query: ({id, ...body}) => {
        return {
          url: `/series/${id}`,
          method: 'PUT',
          body
        };
      }
    }),
    deleteTypeSeries: builder.mutation<any, number>({
      query: (id) => ({
        url: '/series/' + id,
        method: 'DELETE'
      })
    })
  })
});

export const {useGetTypeSeriesPaginationQuery, useGetTypeSeriesQuery, usePutTypeSeriesMutation, usePostTypeSeriesMutation, useDeleteTypeSeriesMutation} = typeSeriesApi;
