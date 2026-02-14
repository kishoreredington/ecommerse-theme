import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export function Counter({ count, onChange, min = 1 }) {
  const handleIncrement = () => {
    onChange(count + 1);
  };

  const handleDecrement = () => {
    if (count > min) {
      onChange(count - 1);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      border="1px solid #ccc"
      padding="4px 8px"
      width="fit-content"
    >
      <IconButton onClick={handleDecrement}>
        <RemoveIcon />
      </IconButton>

      <Typography variant="h6">{count}</Typography>

      <IconButton onClick={handleIncrement}>
        <AddIcon />
      </IconButton>
    </Box>
  );
}
