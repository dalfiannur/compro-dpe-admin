import { createApi } from '@reduxjs/toolkit/query/react'
import { PaginationMeta } from '../entities/PaginationMeta';
import { SkinType } from '../entities/SkinType';
import { baseQuery } from './base'

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
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getSkinTypes: builder.query<SkinTypesResult, Object>({
      query: () => '/skin-types?perPage=1000'
    }),
    postSkinType: builder.mutation<SkinTypeResult, SkinTypeDto>({
      query: (body) => {
        const token = sessionStorage.getItem('token')
        return {
          url: '/skin-types',
          method: 'POST',
          body,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      }
    }),
    putSkinType: builder.mutation<SkinTypeResult, SkinTypeDto & { id: number }>({
      query: ({ id, ...body }) => {
        const token = sessionStorage.getItem('token')
        return {
          url: '/skin-types/' + id,
          method: 'PUT',
          body,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      }
    }),
    deleteSkinType: builder.mutation<SkinTypeResult, number>({
      query: (id) => {
        const token = sessionStorage.getItem('token')
        return {
          url: '/skin-types/' + id,
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      }
    })
  })
})

export const { useGetSkinTypesQuery, usePostSkinTypeMutation, usePutSkinTypeMutation, useDeleteSkinTypeMutation } = skinTypeApi
