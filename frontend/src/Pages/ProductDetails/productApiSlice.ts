import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products/get-all-products",
        method: "GET",
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/products/get-all-orders",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetAllOrdersQuery } =
  productApiSlices;
