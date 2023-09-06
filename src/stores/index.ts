import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react';

import {
  skinConcernApi,
  skinTypeApi,
  authApi,
  bannerApi,
  articleApi,
  userApi,
  typeSeriesApi,
  typeCategoriesApi,
  productCategoriesApi, imgUploaderApi, clinicsApi
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
    [imgUploaderApi.reducerPath]: imgUploaderApi.reducer,
    [clinicsApi.reducerPath]: clinicsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      authApi.middleware,
      bannerApi.middleware,
      typeSeriesApi.middleware,
      productCategoriesApi.middleware,
      skinTypeApi.middleware,
      skinConcernApi.middleware,
      articleApi.middleware,
      userApi.middleware,
      typeCategoriesApi.middleware,
      imgUploaderApi.middleware,
      clinicsApi.middleware
      ),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
