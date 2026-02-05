import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import type { ReactNode } from "react";

export type CommonButtonProps = {
  children: string | ReactNode;
  variant?: MuiButtonProps["variant"];
  onClick?: () => void;
  disabled?: boolean;
} & Omit<MuiButtonProps, "variant" | "children">;

export const OrderStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
