import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://185.244.172.108:8081/' }),
  endpoints: (builder) => ({
    getRows: builder.query({
      query: (eID) => `/v1/outlay-rows/entity/${eID}/row/list`,
    }),
    createRow: builder.mutation({
      query: ({ eID, body }) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/create`,
        method: 'POST',
        body,
      }),
    }),
    updateRow: builder.mutation({
      query: ({ eID, rID, body }) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/${rID}/update`,
        method: 'PUT',
        body,
      }),
    }),
    deleteRow: builder.mutation({
      query: ({ eID, rID }) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/${rID}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetRowsQuery,
  useCreateRowMutation,
  useUpdateRowMutation,
  useDeleteRowMutation,
} = apiSlice;