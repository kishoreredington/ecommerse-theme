import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products/get-all-products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/products/get-all-orders",
        method: "GET",
      }),
    }),
    getSpecificProduct: builder.query({
      query: ({ id }) => ({
        url: `/products/get-specific-product?id=${id}`,
        method: "GET",
      }),
    }),
    setFavourite: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `/products/make-favourite`,
        method: "POST",
        body: {
          userId,
          productId,
        },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetAllOrdersQuery,
  useGetSpecificProductQuery,
  useSetFavouriteMutation,
} = productApiSlices;
