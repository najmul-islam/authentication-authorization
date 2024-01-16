import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URI = "http://localhost:5000/api";

const baseQuery = fetchBaseQuery({
  baseUrl: URI,
  credentials: "include",
  prepareHeaders: async (headers, { getState, endpoint }) => {
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOption) => {
    let result = await baseQuery(args, api, extraOption);

    // if (result?.error?.status === 401) {
    //   api.dispatch(logout());
    // }
    return result;
  },
  tagTypes: ["Profile"],
  endpoints: (builder) => ({}),
});
