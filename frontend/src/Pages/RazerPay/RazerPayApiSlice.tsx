import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (object) => ({
        url: "/cart/create-order",
        method: "POST",
        body: {
          ...object,
        },
      }),
    }),
    verifyOrder: builder.mutation({
      query: (object) => ({
        url: "/cart/verify-payment",
        method: "POST",
        body: {
          ...object,
        },
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useVerifyOrderMutation } = authApiSlice;
