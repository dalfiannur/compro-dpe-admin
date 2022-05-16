import { createApi } from '@reduxjs/toolkit/query/react'
import {baseQuery} from './base'

type LoginDto = {
  email: string;
  password: string;
}

type LoginResult = {
  type: string;
  token: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    postLogin: builder.mutation<LoginResult, LoginDto>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body
      })
    })
  })
})

export const { usePostLoginMutation } = authApi
