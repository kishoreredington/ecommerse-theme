import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: ({ name, email, password, confirmPassword }) => ({
        url: "/auth/register",
        method: "POST",
        body: { name, email, password, confirmPassword },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
