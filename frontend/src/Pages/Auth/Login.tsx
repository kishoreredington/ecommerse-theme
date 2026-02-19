import { useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#E8C97E" },
    background: { default: "#0A0A0F", paper: "#111118" },
    text: { primary: "#F0EDE8", secondary: "#7A7A8C" },
  },
  typography: { fontFamily: "'DM Sans', sans-serif" },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#16161F",
            borderRadius: "12px",
            color: "#F0EDE8",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.95rem",
            transition: "box-shadow 0.25s ease",
            "& fieldset": { borderColor: "#2A2A38", borderWidth: "1.5px" },
            "&:hover fieldset": { borderColor: "#3D3D52" },
            "&.Mui-focused fieldset": {
              borderColor: "#E8C97E",
              borderWidth: "1.5px",
            },
            "&.Mui-focused": { boxShadow: "0 0 0 3px rgba(232,201,126,0.10)" },
          },
          "& .MuiInputLabel-root": {
            color: "#7A7A8C",
            fontFamily: "'DM Sans', sans-serif",
            "&.Mui-focused": { color: "#E8C97E" },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: "1rem",
          letterSpacing: "0.01em",
          padding: "14px 28px",
          transition: "all 0.25s ease",
        },
      },
    },
  },
});

// ─── Keyframes ────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.18; transform: scale(1); }
    50%       { opacity: 0.28; transform: scale(1.06); }
  }

  .fade-up-1 { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) 0.05s both; }
  .fade-up-2 { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) 0.15s both; }
  .fade-up-3 { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) 0.25s both; }
  .fade-up-4 { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) 0.35s both; }
  .fade-up-5 { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) 0.45s both; }
  .fade-up-6 { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) 0.55s both; }

  .login-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(232,201,126,0.30) !important;
  }
  .login-btn:active:not(:disabled) { transform: translateY(0); }
`;

// ─── Component ────────────────────────────────────────────────────────────────
const Login = () => {
  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleLogin = async () => {
    try {
      await login({ email: form.email, password: form.password }).unwrap();
      setSnackbar({
        open: true,
        message: "Welcome back!",
        severity: "success",
      });

      navigate("/"); // Redirect to dashboard after successful login
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.data?.message ?? "Invalid credentials. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <style>{styles}</style>

      {/* ── Full-page wrapper ── */}
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: "#0A0A0F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Orb 1 – warm gold top-right */}
        <Box
          sx={{
            position: "absolute",
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,201,126,0.13) 0%, transparent 70%)",
            top: "-140px",
            right: "-100px",
            animation: "glowPulse 6s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Orb 2 – cool indigo bottom-left */}
        <Box
          sx={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(90,70,200,0.10) 0%, transparent 70%)",
            bottom: "-100px",
            left: "-70px",
            animation: "glowPulse 8s ease-in-out infinite 2s",
            pointerEvents: "none",
          }}
        />

        {/* Grid texture */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.025,
            backgroundImage: `
            linear-gradient(#E8C97E 1px, transparent 1px),
            linear-gradient(90deg, #E8C97E 1px, transparent 1px)
          `,
            backgroundSize: "52px 52px",
          }}
        />

        {/* ── Card ── */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 440,
            mx: 2,
            backgroundColor: "#111118",
            borderRadius: "24px",
            border: "1px solid #1E1E2A",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)",
            p: { xs: "36px 24px", sm: "48px 44px" },
          }}
        >
          {/* ── Logo mark ── */}
          <Box
            className="fade-up-1"
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4.5 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-full"></div>
              <span className="text-xl font-semibold text-white">Zen</span>
            </div>
          </Box>

          {/* ── Heading ── */}
          <Box className="fade-up-2" sx={{ mb: 0.75 }}>
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: { xs: "1.95rem", sm: "2.35rem" },
                lineHeight: 1.15,
                color: "#F0EDE8",
                letterSpacing: "-0.01em",
              }}
            >
              Welcome back
            </Typography>
          </Box>

          <Box className="fade-up-3" sx={{ mb: 4 }}>
            <Typography sx={{ color: "#7A7A8C", fontSize: "0.9rem" }}>
              Sign in to continue to your dashboard
            </Typography>
          </Box>

          {/* ── Email ── */}
          <Box className="fade-up-4" sx={{ mb: 2.5 }}>
            <TextField
              fullWidth
              label="Email address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon
                      sx={{ color: "#3D3D52", fontSize: 19 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* ── Password ── */}
          <Box className="fade-up-4" sx={{ mb: 1.5 }}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#3D3D52", fontSize: 19 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((p) => !p)}
                      edge="end"
                      sx={{
                        color: "#3D3D52",
                        "&:hover": { color: "#E8C97E" },
                        transition: "color 0.2s",
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon sx={{ fontSize: 19 }} />
                      ) : (
                        <VisibilityOutlinedIcon sx={{ fontSize: 19 }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* ── Forgot password ── */}
          <Box
            className="fade-up-4"
            sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}
          >
            <Link
              to="/sign-up"
              underline="none"
              sx={{
                color: "#7A7A8C",
                fontSize: "0.82rem",
                transition: "color 0.2s",
                "&:hover": { color: "#E8C97E" },
              }}
            >
              Forgot password?
            </Link>
          </Box>

          {/* ── Sign in button ── */}
          <Box className="fade-up-5">
            <Button
              className="login-btn"
              fullWidth
              onClick={handleLogin}
              disabled={isLoading}
              sx={{
                background: isLoading
                  ? "#1E1E2A"
                  : "linear-gradient(135deg, #E8C97E 0%, #C49A30 100%)",
                color: isLoading ? "#7A7A8C" : "#0A0A0F",
                fontWeight: 700,
                height: 52,
                mb: 3,
                boxShadow: "0 4px 20px rgba(232,201,126,0.18)",
                "&.Mui-disabled": { opacity: 0.45 },
              }}
              endIcon={
                isLoading ? (
                  <CircularProgress size={17} sx={{ color: "#7A7A8C" }} />
                ) : (
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                )
              }
            >
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </Box>

          {/* ── Divider + sign up ── */}
          <Box className="fade-up-6">
            <Divider sx={{ borderColor: "#1E1E2A", mb: 3 }}>
              <Typography
                sx={{ color: "#3D3D52", fontSize: "0.75rem", px: 1.5 }}
              >
                OR
              </Typography>
            </Divider>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ color: "#7A7A8C", fontSize: "0.88rem" }}>
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  underline="none"
                  sx={{
                    color: "#E8C97E",
                    fontWeight: 600,
                    transition: "opacity 0.2s",
                    "&:hover": { opacity: 0.7 },
                  }}
                >
                  Create one
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Snackbar ── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            fontFamily: "'DM Sans', sans-serif",
            borderRadius: "12px",
            ...(snackbar.severity === "success" && {
              backgroundColor: "#152215",
              color: "#7EE8A2",
              border: "1px solid #1E3A1E",
              "& .MuiAlert-icon": { color: "#7EE8A2" },
            }),
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Login;
