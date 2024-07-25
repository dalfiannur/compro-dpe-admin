import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { Banner, BannerDto, PaginationMeta } from "../entities";
import { baseQuery } from './base'

type BannersResult = {
  data: Banner[],
  meta: PaginationMeta
}

type BannerResult = {
  data: Banner
}
export const bannerApi = createApi({
  reducerPath: 'bannerApi',
  baseQuery,
  endpoints: (build) => ({
    getBanners: build.query<BannersResult, any>({
      query: () => ({
        url: 'main-banners'
      })
    }),
    postBanner: build.mutation<BannerResult, BannerDto>({
      query: (body) => ({
        url: 'main-banners',
        method: 'POST',
        body
      })
    }),
    putBanner: build.mutation<BannerResult, Partial<BannerDto> & {id: number} >({
      query: ({id, ...body}) => {
        return {
          url: `main-banners/${id}`,
          method: 'PUT',
          body
        }
      }
    }),
    deleteBanner: build.mutation<Omit<BannerResult, 'data'>, number>({
      query: (id) => ({
        url: 'main-banners/' + id,
        method: 'DELETE'
      })
    })
  })
});

export const { useGetBannersQuery, usePostBannerMutation, usePutBannerMutation, useDeleteBannerMutation } = bannerApi;
