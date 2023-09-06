import { createApi } from "@reduxjs/toolkit/query/react";
import {Clinics, PaginationMeta} from "entities";
import { baseQuery } from "./base";

type GetClinicsResult = {
    data: Clinics[]
    meta: PaginationMeta;
};

type GetClinicResult = {
    data: Clinics;
};

export const clinicsApi = createApi({
    reducerPath: 'clinicsApi',
    baseQuery,
    endpoints: (build) => ({
        getClinics: build.query<GetClinicsResult, any>({
            query: () => '/clinics'
        }),
        postClinic: build.mutation<GetClinicResult, any>({
            query: (body) => ({
                url: '/clinics',
                method: 'POST',
                body
            })
        }),
        putClinic: build.mutation<GetClinicResult, any & { id: number }>({
            query: ({id, ...body}) => ({
                url: '/clinics/' + id,
                method: 'PUT',
                body
            })
        }),
        deleteClinic: build.mutation<GetClinicResult, number>({
            query: (id) => ({
                url: '/clinics/' + id,
                method: 'DELETE'
            })
        })
    })
})

export const {useGetClinicsQuery, usePostClinicMutation, usePutClinicMutation, useDeleteClinicMutation} = clinicsApi;