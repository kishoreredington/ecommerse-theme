import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products/get-all-products",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProductsQuery } = productApiSlices;
