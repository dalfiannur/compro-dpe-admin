import {createApi} from '@reduxjs/toolkit/query/react'
import {PaginationMeta} from '../entities/PaginationMeta';
import {User} from '../entities/User';
import {baseQuery} from './base'

type UsersResult = {
  data: {
    data: User[],
    meta: {
      total: number
      per_page: number
    }
  };
  meta: PaginationMeta
}

type UserResult = {
  data: User;
}

type UserDto = Omit<User, "id" | "createdAt">

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResult, Object>({
      query: ({page, perPage}:any) => `/users?perPage=${perPage}&page=${page}`
    }),
    postUser: builder.mutation<UserResult, any>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body
      })
    }),
    putUser: builder.mutation<UserResult, UserDto & { id: number }>({
      query: ({id, ...body}) => ({
        url: '/users/' + id,
        method: 'PUT',
        body
      })
    }),
    deleteUser: builder.mutation<UserResult, number>({
      query: (id) => ({
        url: '/users/' + id,
        method: 'DELETE'
      })
    })
  })
});

export const {useGetUsersQuery, usePostUserMutation, usePutUserMutation, useDeleteUserMutation} = userApi;
