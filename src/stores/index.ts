import { configureStore } from '@reduxjs/toolkit'
import { User } from 'tabler-icons-react'

import {
  skinConcernApi,
  skinTypeApi,
  authApi,
  bannerApi,
  articleApi,
  userApi,
  typeSeriesApi,
  typeCategoriesApi,
  productCategoriesApi
} from '../services'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productCategoriesApi.reducerPath]: productCategoriesApi.reducer,
    [skinTypeApi.reducerPath]: skinTypeApi.reducer,
    [skinConcernApi.reducerPath]: skinConcernApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [typeCategoriesApi.reducerPath]: typeCategoriesApi.reducer,
    [typeSeriesApi.reducerPath]: typeSeriesApi.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
