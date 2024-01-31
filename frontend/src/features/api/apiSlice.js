import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../auth/authSlice";

const URI = "http://localhost:5000/api";

const baseQuery = fetchBaseQuery({
  baseUrl: URI,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.user?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOption) => {
    let result = await baseQuery(args, api, extraOption);

    if (result?.error?.status === 401) {
      api.dispatch(logout());
      localStorage.removeItem("user");
    }
    return result;
  },
  tagTypes: ["Profile"],
  endpoints: (builder) => ({}),
});
