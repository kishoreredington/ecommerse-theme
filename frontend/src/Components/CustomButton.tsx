import Button from "@mui/material/Button";
import type { CommonButtonProps } from "../type";
import { Typography } from "@mui/material";

export default function CommonButton({
  variant = "contained",
  onClick,
  disabled = false,
  children,
  ...props
}: CommonButtonProps) {
  return (
    <Button variant={variant} onClick={onClick} disabled={disabled} {...props}>
      <Typography variant="body1">{children}</Typography>
    </Button>
  );
}
