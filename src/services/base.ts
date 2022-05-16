import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query";
import store from 'store'

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.dpelab.co.id',
  prepareHeaders: (headers) => {
    const token = store.get('token', '');

    headers.set('authorization', 'Bearer ' + token);

    return headers;
  }
});
