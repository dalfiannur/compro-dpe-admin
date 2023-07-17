import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';

// Function to convert an object into FormData
function objectToFormData(img:any) {
    console.log(img)
    const formData = new FormData();
    img.images.map((item:File, index:number) => {
        formData.append(`images[${index}]`, item);
    })
    return formData;
}

export const imgUploaderApi = createApi({
    reducerPath: 'imgApi',
    baseQuery,
    endpoints: (builder) => ({
        postImg: builder.mutation<any, any>({
            query: (data) => ({
                url: '/images/upload',
                method: 'POST',
                body: objectToFormData(data), // Convert the object to FormData
            }),
        }),
    }),
});

export const { usePostImgMutation } = imgUploaderApi;
