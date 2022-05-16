import {createApi} from '@reduxjs/toolkit/query/react'
import {PaginationMeta} from '../entities/PaginationMeta';
import {SkinType} from '../entities/SkinType';
import {baseQuery} from './base'

type SkinTypesResult = {
  data: SkinType[];
  meta: PaginationMeta
}

type SkinTypeResult = {
  data: SkinType;
}

type SkinTypeDto = Omit<SkinType, "id" | "createdAt">

export const skinTypeApi = createApi({
  reducerPath: 'skinTypeApi',
  baseQuery,
  endpoints: (builder) => ({
    getSkinTypes: builder.query<SkinTypesResult, Object>({
      query: () => '/skin-types?perPage=1000'
    }),
    postSkinType: builder.mutation<SkinTypeResult, SkinTypeDto>({
      query: (body) => ({
        url: '/skin-types',
        method: 'POST',
        body
      })
    }),
    putSkinType: builder.mutation<SkinTypeResult, SkinTypeDto & { id: number }>({
      query: ({id, ...body}) => ({
        url: '/skin-types/' + id,
        method: 'PUT',
        body
      })
    }),
    deleteSkinType: builder.mutation<SkinTypeResult, number>({
      query: (id) => ({
        url: '/skin-types/' + id,
        method: 'DELETE'
      })
    })
  })
});

export const {useGetSkinTypesQuery, usePostSkinTypeMutation, usePutSkinTypeMutation, useDeleteSkinTypeMutation} = skinTypeApi;
