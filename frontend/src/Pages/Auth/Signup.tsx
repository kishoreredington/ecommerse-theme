import { useState } from "react";
import { useRegisterMutation } from "./authApiSlice";
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
  Link,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
  .fade-up-7 { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) 0.65s both; }

  .signup-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(232,201,126,0.30) !important;
  }
  .signup-btn:active:not(:disabled) { transform: translateY(0); }

  .strength-bar {
    height: 3px;
    border-radius: 99px;
    transition: width 0.35s ease, background-color 0.35s ease;
  }
`;

// ─── Password strength helper ─────────────────────────────────────────────────
const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const map = [
    { label: "Too short", color: "#E85D5D" },
    { label: "Weak", color: "#E85D5D" },
    { label: "Fair", color: "#E8A97E" },
    { label: "Good", color: "#E8C97E" },
    { label: "Strong", color: "#7EE8A2" },
  ];
  return { score, ...map[score] };
};

// ─── Component ────────────────────────────────────────────────────────────────
const Signup = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const strength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear field error on change
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSignup = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      }).unwrap();
      setSnackbar({
        open: true,
        message: "Account created! Welcome to Zen.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message:
          err?.data?.message ?? "Something went wrong. Please try again.",
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
            my: 4,
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
              Create account
            </Typography>
          </Box>

          <Box className="fade-up-3" sx={{ mb: 4 }}>
            <Typography sx={{ color: "#7A7A8C", fontSize: "0.9rem" }}>
              Join Zen and start your journey today
            </Typography>
          </Box>

          {/* ── Full Name ── */}
          <Box className="fade-up-4" sx={{ mb: 2.5 }}>
            <TextField
              fullWidth
              label="Full name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleSignup()}
              autoComplete="name"
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon
                      sx={{ color: "#3D3D52", fontSize: 19 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
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
              onKeyDown={(e) => e.key === "Enter" && handleSignup()}
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email}
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
          <Box className="fade-up-5" sx={{ mb: form.password ? 1 : 2.5 }}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleSignup()}
              autoComplete="new-password"
              error={!!errors.password}
              helperText={errors.password}
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

          {/* ── Password strength indicator ── */}
          {form.password && (
            <Box className="fade-up-5" sx={{ mb: 2.5, px: 0.5 }}>
              <Box sx={{ display: "flex", gap: 0.75, mb: 0.75 }}>
                {[1, 2, 3, 4].map((i) => (
                  <Box
                    key={i}
                    className="strength-bar"
                    sx={{
                      flex: 1,
                      backgroundColor:
                        strength.score >= i ? strength.color : "#2A2A38",
                    }}
                  />
                ))}
              </Box>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: strength.color,
                  transition: "color 0.35s ease",
                }}
              >
                {strength.label}
              </Typography>
            </Box>
          )}

          {/* ── Confirm Password ── */}
          <Box className="fade-up-5" sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="Confirm password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleSignup()}
              autoComplete="new-password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#3D3D52", fontSize: 19 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      edge="end"
                      sx={{
                        color: "#3D3D52",
                        "&:hover": { color: "#E8C97E" },
                        transition: "color 0.2s",
                      }}
                    >
                      {showConfirmPassword ? (
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

          {/* ── Sign up button ── */}
          <Box className="fade-up-6">
            <Button
              className="signup-btn"
              fullWidth
              onClick={handleSignup}
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
              {isLoading ? "Creating account…" : "Create account"}
            </Button>
          </Box>

          {/* ── Divider + sign in ── */}
          <Box className="fade-up-7">
            <Divider sx={{ borderColor: "#1E1E2A", mb: 3 }}>
              <Typography
                sx={{ color: "#3D3D52", fontSize: "0.75rem", px: 1.5 }}
              >
                OR
              </Typography>
            </Divider>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ color: "#7A7A8C", fontSize: "0.88rem" }}>
                Already have an account?{" "}
                <Link
                  href="#"
                  underline="none"
                  sx={{
                    color: "#E8C97E",
                    fontWeight: 600,
                    transition: "opacity 0.2s",
                    "&:hover": { opacity: 0.7 },
                  }}
                >
                  Sign in
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

export default Signup;
