import { createTheme } from "@mui/material/styles";
import { type ButtonPropsVariantOverrides } from "@mui/material/Button";
import { type OverridableStringUnion } from "@mui/types";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    luxury: true;
    secondary: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: `"Bodoni Moda", serif`,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`,
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
          fontSize: "14px",
          fontWeight: 500,
          color: "white",
        },
        filledSuccess: {
          backgroundColor: "#000000ff",
        },
        filledError: {
          backgroundColor: "#d32f2f",
        },
        filledWarning: {
          backgroundColor: "#ed6c02",
        },
        filledInfo: {
          backgroundColor: "#000000ff",
        },
      },
    },

    MuiButton: {
      variants: [
        {
          props: { variant: "secondary" },
          style: {
            background: "white",
            color: "#fff",
            textTransform: "none",
            borderRadius: "0px",
            padding: "14px 32px",
            boxShadow: "none",
          },
        },
      ],

      styleOverrides: {
        contained: {
          background: "linear-gradient(180deg, #0b1626 0%, #050b15 100%)",
          textTransform: "none",
          borderRadius: "0px",
          padding: "14px 32px",
          boxShadow: "none",
          "&:hover": {
            background: "linear-gradient(180deg, #101f36 0%, #050b15 100%)",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

export default theme;
