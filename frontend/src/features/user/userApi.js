import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useProfileQuery } = userApi;
