import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { FakeApiResponseType } from "../types";

export const fakeApi = createApi({
  reducerPath: "fakeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getFakeProducts: builder.query<FakeApiResponseType[], void>({
      query: () => `/products?limit=5`,
    }),
  }),
});

export const { useGetFakeProductsQuery } = fakeApi;
