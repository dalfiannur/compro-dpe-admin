import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import store from 'store'

export const baseQuery = () => {
  return fetchBaseQuery({
    baseUrl: 'https://api.dpelab.co.id'
  })
};

export const authorize = () => ({
  headers: {
    authorization: 'bearer ' + store.get('token', '')
  }
})