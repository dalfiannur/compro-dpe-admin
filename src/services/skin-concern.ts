import {createApi} from '@reduxjs/toolkit/query/react'
import {PaginationMeta} from '../entities/PaginationMeta';
import {SkinConcern} from '../entities/SkinConcern';
import {baseQuery} from './base'

type SkinConcernsResult = {
  data: SkinConcern[];
  meta: PaginationMeta
}

type SkinConcernResult = {
  data: SkinConcern;
}

type SkinConcernDto = Omit<SkinConcern, "id" | "createdAt">

export const skinConcernApi = createApi({
  reducerPath: 'skinConcernApi',
  baseQuery,
  endpoints: (builder) => ({
    getSkinConcerns: builder.query<SkinConcernsResult, Object>({
      query: () => '/skin-concerns?perPage=1000'
    }),
    postSkinConcern: builder.mutation<SkinConcernResult, SkinConcernDto>({
      query: (body) => ({
        url: '/skin-concerns',
        method: 'POST',
        body
      })
    }),
    putSkinConcern: builder.mutation<SkinConcernResult, SkinConcernDto & { id: number }>({
      query: ({id, ...body}) => ({
        url: '/skin-concerns/' + id,
        method: 'PUT',
        body
      })
    }),
    deleteSkinConcern: builder.mutation<SkinConcernResult, number>({
      query: (id) => ({
        url: '/skin-concerns/' + id,
        method: 'DELETE',
      })
    })
  })
});

export const {useGetSkinConcernsQuery, usePostSkinConcernMutation, usePutSkinConcernMutation, useDeleteSkinConcernMutation} = skinConcernApi;
