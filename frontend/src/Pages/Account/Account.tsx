import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  TextField,
  Button,
  Chip,
  Switch,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  LocationOnOutlined,
  TuneOutlined,
  LogoutOutlined,
  EditOutlined,
  AddOutlined,
  DeleteOutlineOutlined,
  CheckCircleOutline,
  LocalShippingOutlined,
  HourglassEmptyOutlined,
} from "@mui/icons-material";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockUser = {
  firstName: "Alexandra",
  lastName: "Moreau",
  email: "alex.moreau@email.com",
  phone: "+1 (555) 012-3456",
  memberSince: "January 2023",
  tier: "Prestige Member",
};

const mockOrders = [
  {
    id: "#ZEN-00412",
    date: "Feb 20, 2026",
    status: "Delivered",
    item: "Velvet Rose Oud",
    size: "50ml",
    brand: "Royal Scents",
    total: "$4,999.00",
  },
  {
    id: "#ZEN-00387",
    date: "Jan 14, 2026",
    status: "In Transit",
    item: "Aqua Spirit",
    size: "100ml",
    brand: "Oceanica",
    total: "$320.00",
  },
  {
    id: "#ZEN-00351",
    date: "Dec 02, 2025",
    status: "Processing",
    item: "Bleu de Noir",
    size: "50ml",
    brand: "Maison Élégance",
    total: "$480.00",
  },
];

const mockAddresses = [
  {
    id: 1,
    label: "Home",
    line1: "14 Rue de la Paix",
    line2: "Apt 3B",
    city: "New York, NY 10001",
    country: "United States",
    default: true,
  },
  {
    id: 2,
    label: "Office",
    line1: "350 Fifth Avenue",
    line2: "Suite 5800",
    city: "New York, NY 10118",
    country: "United States",
    default: false,
  },
];

const prefSections = {
  Notifications: [
    {
      id: "orders",
      label: "Order Updates",
      desc: "Shipping and delivery notifications",
      default: true,
    },
    {
      id: "arrivals",
      label: "New Arrivals",
      desc: "Be first to know about new fragrances",
      default: true,
    },
    {
      id: "offers",
      label: "Exclusive Offers",
      desc: "Early access to promotions and limited editions",
      default: false,
    },
    {
      id: "restock",
      label: "Restock Alerts",
      desc: "Notify when a wishlisted item is back",
      default: true,
    },
  ],
  Privacy: [
    {
      id: "recs",
      label: "Personalized Recommendations",
      desc: "Tailor your shopping experience",
      default: true,
    },
    {
      id: "analytics",
      label: "Data Analytics",
      desc: "Help us improve with anonymous usage data",
      default: false,
    },
  ],
};

// ─── Types & Helpers ──────────────────────────────────────────────────────────
type Tab = "profile" | "orders" | "addresses" | "preferences";
type StatusColor = "default" | "success" | "warning" | "error" | "info";

const statusConfig: Record<
  string,
  { color: StatusColor; icon: React.ReactNode }
> = {
  Delivered: {
    color: "success",
    icon: <CheckCircleOutline sx={{ fontSize: "14px !important" }} />,
  },
  "In Transit": {
    color: "info",
    icon: <LocalShippingOutlined sx={{ fontSize: "14px !important" }} />,
  },
  Processing: {
    color: "warning",
    icon: <HourglassEmptyOutlined sx={{ fontSize: "14px !important" }} />,
  },
};

const navTabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <PersonOutline fontSize="small" /> },
  {
    id: "orders",
    label: "Orders",
    icon: <ShoppingBagOutlined fontSize="small" />,
  },
  {
    id: "addresses",
    label: "Addresses",
    icon: <LocationOnOutlined fontSize="small" />,
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: <TuneOutlined fontSize="small" />,
  },
];

// Shared sx tokens aligned with theme.js
const sharp = { borderRadius: 0 } as const;
const mono = "Montserrat, sans-serif";

const labelSx = {
  fontFamily: mono,
  fontSize: "0.62rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  color: "#888",
};

const sectionTitle = {
  fontFamily: mono,
  fontWeight: 300,
  letterSpacing: "0.04em",
  pb: 2,
  borderBottom: "1px solid #e5e5e5",
  mb: 4,
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Account() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [editMode, setEditMode] = useState(false);
  const [savedSnack, setSavedSnack] = useState(false);

  const allPrefs = [...prefSections.Notifications, ...prefSections.Privacy];
  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(allPrefs.map((p) => [p.id, p.default])),
  );

  const initials = `${mockUser.firstName[0]}${mockUser.lastName[0]}`;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8f7f5",
        fontFamily: mono,
        px: 5,
        pb: 12,
        pt: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 6,
          alignItems: "start",
        }}
      >
        {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
        <Paper
          elevation={0}
          sx={{
            ...sharp,
            border: "1px solid #e5e5e5",
            p: 4,
            position: "sticky",
            top: 24,
          }}
        >
          <Avatar
            sx={{
              ...sharp,
              width: 68,
              height: 68,
              bgcolor: "#111",
              fontFamily: mono,
              fontSize: "1.4rem",
              fontWeight: 700,
              mb: 2,
            }}
          >
            {initials}
          </Avatar>

          <Typography
            sx={{
              fontFamily: mono,
              fontWeight: 700,
              fontSize: "0.95rem",
              mb: 0.5,
            }}
          >
            {mockUser.firstName} {mockUser.lastName}
          </Typography>
          <Typography sx={{ ...labelSx, mb: 3 }}>{mockUser.tier}</Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Nav */}
          <Box className="flex flex-col gap-0.5">
            {navTabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <Box
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-3 cursor-pointer"
                  sx={{
                    px: 1.5,
                    py: 1.25,
                    bgcolor: active ? "#111" : "transparent",
                    color: active ? "#fff" : "#333",
                    transition: "background .15s",
                    "&:hover": { bgcolor: active ? "#111" : "#eeece9" },
                  }}
                >
                  {tab.icon}
                  <Typography
                    sx={{
                      fontFamily: mono,
                      fontSize: "0.78rem",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {tab.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box
            className="flex items-center gap-2 cursor-pointer"
            sx={{
              color: "#888",
              "&:hover": { color: "#111" },
              transition: "color .15s",
            }}
          >
            <LogoutOutlined fontSize="small" />
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Sign Out
            </Typography>
          </Box>
        </Paper>

        {/* ── MAIN ─────────────────────────────────────────────────────────── */}
        <Box>
          {/* ══ PROFILE ══ */}
          {activeTab === "profile" && (
            <Box>
              <Typography variant="h4" sx={sectionTitle}>
                My Profile
              </Typography>

              {/* Member card */}
              <Paper
                elevation={0}
                sx={{
                  ...sharp,
                  background:
                    "linear-gradient(180deg, #0b1626 0%, #050b15 100%)",
                  color: "#fff",
                  p: 4,
                  mb: 4,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography sx={{ ...labelSx, color: "#666", mb: 1 }}>
                    Member Since
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: mono,
                      fontSize: "1.4rem",
                      fontWeight: 300,
                    }}
                  >
                    {mockUser.memberSince}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ ...labelSx, color: "#666", mb: 1 }}>
                    Status
                  </Typography>
                  <Chip
                    label={mockUser.tier}
                    variant="outlined"
                    size="small"
                    sx={{
                      ...sharp,
                      color: "#fff",
                      borderColor: "rgba(255,255,255,0.35)",
                      fontFamily: mono,
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                    }}
                  />
                </Box>
              </Paper>

              {/* Fields */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {[
                  { label: "First Name", value: mockUser.firstName, xs: 6 },
                  { label: "Last Name", value: mockUser.lastName, xs: 6 },
                  { label: "Email Address", value: mockUser.email, xs: 12 },
                  { label: "Phone Number", value: mockUser.phone, xs: 6 },
                ].map(({ label, value, xs }) => (
                  <Grid item xs={xs} key={label}>
                    <Typography sx={{ ...labelSx, mb: 0.5 }}>
                      {label}
                    </Typography>
                    {editMode ? (
                      <TextField
                        defaultValue={value}
                        fullWidth
                        variant="standard"
                        InputProps={{
                          sx: { fontFamily: mono, fontSize: "0.9rem" },
                        }}
                        sx={{
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "#111",
                          },
                        }}
                      />
                    ) : (
                      <Typography
                        sx={{
                          fontFamily: mono,
                          fontSize: "0.9rem",
                          py: 1.5,
                          borderBottom: "1px solid #e5e5e5",
                        }}
                      >
                        {value}
                      </Typography>
                    )}
                  </Grid>
                ))}
                <Grid item xs={6}>
                  <Typography sx={{ ...labelSx, mb: 0.5 }}>Password</Typography>
                  <Typography
                    sx={{
                      fontFamily: mono,
                      fontSize: "0.9rem",
                      py: 1.5,
                      borderBottom: "1px solid #e5e5e5",
                      letterSpacing: "0.2em",
                    }}
                  >
                    ••••••••••
                  </Typography>
                </Grid>
              </Grid>

              <Box className="flex gap-3">
                {editMode ? (
                  <>
                    <Button
                      variant="contained"
                      sx={{ ...sharp, fontFamily: mono }}
                      onClick={() => {
                        setEditMode(false);
                        setSavedSnack(true);
                      }}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        ...sharp,
                        fontFamily: mono,
                        borderColor: "#111",
                        color: "#111",
                      }}
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<EditOutlined />}
                    sx={{ ...sharp, fontFamily: mono }}
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
            </Box>
          )}

          {/* ══ ORDERS ══ */}
          {activeTab === "orders" && (
            <Box>
              <Typography variant="h4" sx={sectionTitle}>
                Order History
              </Typography>

              <TableContainer
                component={Paper}
                elevation={0}
                sx={{ ...sharp, border: "1px solid #e5e5e5" }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#f8f7f5" }}>
                      {["Order ID", "Item", "Date", "Status", "Total"].map(
                        (h) => (
                          <TableCell
                            key={h}
                            sx={{
                              fontFamily: mono,
                              fontSize: "0.58rem",
                              fontWeight: 700,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: "#888",
                              borderBottom: "1px solid #e5e5e5",
                            }}
                          >
                            {h}
                          </TableCell>
                        ),
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockOrders.map((order) => {
                      const st = statusConfig[order.status] ?? {
                        color: "default" as StatusColor,
                        icon: null,
                      };
                      return (
                        <TableRow
                          key={order.id}
                          hover
                          sx={{
                            "&:last-child td": { border: 0 },
                            cursor: "pointer",
                          }}
                        >
                          <TableCell
                            sx={{
                              fontFamily: mono,
                              fontSize: "0.72rem",
                              color: "#888",
                              letterSpacing: "0.06em",
                            }}
                          >
                            {order.id}
                          </TableCell>
                          <TableCell>
                            <Typography
                              sx={{
                                fontFamily: mono,
                                fontSize: "0.82rem",
                                fontWeight: 600,
                                mb: 0.3,
                              }}
                            >
                              {order.item}{" "}
                              <Box
                                component="span"
                                sx={{ fontWeight: 300, color: "#888" }}
                              >
                                – {order.size}
                              </Box>
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: mono,
                                fontSize: "0.7rem",
                                color: "#888",
                              }}
                            >
                              {order.brand}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: mono,
                              fontSize: "0.78rem",
                              color: "#555",
                            }}
                          >
                            {order.date}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={order.status}
                              icon={st.icon as React.ReactElement}
                              color={st.color}
                              size="small"
                              variant="outlined"
                              sx={{
                                ...sharp,
                                fontFamily: mono,
                                fontSize: "0.58rem",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                              }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: mono,
                              fontSize: "0.88rem",
                              fontWeight: 700,
                            }}
                          >
                            {order.total}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* ══ ADDRESSES ══ */}
          {activeTab === "addresses" && (
            <Box>
              <Typography variant="h4" sx={sectionTitle}>
                Saved Addresses
              </Typography>

              <Grid container spacing={2.5}>
                {mockAddresses.map((addr) => (
                  <Grid item xs={6} key={addr.id}>
                    <Paper
                      elevation={0}
                      sx={{
                        ...sharp,
                        border: `1px solid ${addr.default ? "#111" : "#e5e5e5"}`,
                        p: 3.5,
                        height: "100%",
                        transition: "border-color .2s",
                        "&:hover": { borderColor: "#111" },
                      }}
                    >
                      <Box className="flex items-center gap-3 mb-4">
                        <Typography sx={{ ...labelSx, mb: 0 }}>
                          {addr.label}
                        </Typography>
                        {addr.default && (
                          <Chip
                            label="Default"
                            size="small"
                            sx={{
                              ...sharp,
                              bgcolor: "#111",
                              color: "#fff",
                              fontFamily: mono,
                              fontSize: "0.55rem",
                              letterSpacing: "0.1em",
                              height: 20,
                            }}
                          />
                        )}
                      </Box>

                      <Typography
                        sx={{
                          fontFamily: mono,
                          fontSize: "0.82rem",
                          lineHeight: 2,
                          color: "#333",
                          mb: 3,
                        }}
                      >
                        {addr.line1}
                        <br />
                        {addr.line2}
                        <br />
                        {addr.city}
                        <br />
                        {addr.country}
                      </Typography>

                      <Box className="flex gap-3">
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={
                            <EditOutlined
                              sx={{ fontSize: "0.75rem !important" }}
                            />
                          }
                          sx={{
                            ...sharp,
                            fontFamily: mono,
                            fontSize: "0.58rem",
                            letterSpacing: "0.1em",
                            borderColor: "#ccc",
                            color: "#555",
                            "&:hover": { borderColor: "#111", color: "#111" },
                          }}
                        >
                          Edit
                        </Button>
                        {!addr.default && (
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={
                              <DeleteOutlineOutlined
                                sx={{ fontSize: "0.75rem !important" }}
                              />
                            }
                            sx={{
                              ...sharp,
                              fontFamily: mono,
                              fontSize: "0.58rem",
                              letterSpacing: "0.1em",
                              borderColor: "#ccc",
                              color: "#555",
                              "&:hover": {
                                borderColor: "#d32f2f",
                                color: "#d32f2f",
                              },
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </Box>
                    </Paper>
                  </Grid>
                ))}

                {/* Add new */}
                <Grid item xs={6}>
                  <Paper
                    elevation={0}
                    className="flex flex-col items-center justify-center cursor-pointer"
                    sx={{
                      ...sharp,
                      border: "1px dashed #ccc",
                      minHeight: 220,
                      gap: 1.5,
                      transition: "border-color .2s",
                      "&:hover": { borderColor: "#111" },
                    }}
                  >
                    <AddOutlined sx={{ fontSize: 28, color: "#bbb" }} />
                    <Typography sx={{ ...labelSx, mb: 0 }}>
                      Add New Address
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* ══ PREFERENCES ══ */}
          {activeTab === "preferences" && (
            <Box>
              <Typography variant="h4" sx={sectionTitle}>
                Preferences
              </Typography>

              {Object.entries(prefSections).map(([section, prefs]) => (
                <Box key={section} sx={{ mb: 5 }}>
                  <Typography
                    sx={{
                      ...labelSx,
                      mb: 2,
                      pb: 1.5,
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    {section}
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{ ...sharp, border: "1px solid #e5e5e5" }}
                  >
                    {prefs.map((pref, i) => (
                      <Box
                        key={pref.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          px: 3,
                          py: 2,
                          borderBottom:
                            i < prefs.length - 1 ? "1px solid #f0f0f0" : "none",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontFamily: mono,
                              fontSize: "0.82rem",
                              fontWeight: 500,
                              mb: 0.4,
                            }}
                          >
                            {pref.label}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: mono,
                              fontSize: "0.72rem",
                              color: "#888",
                            }}
                          >
                            {pref.desc}
                          </Typography>
                        </Box>
                        <Switch
                          checked={toggles[pref.id]}
                          onChange={(e) =>
                            setToggles((prev) => ({
                              ...prev,
                              [pref.id]: e.target.checked,
                            }))
                          }
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#111",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                              { bgcolor: "#111" },
                          }}
                        />
                      </Box>
                    ))}
                  </Paper>
                </Box>
              ))}

              <Button
                variant="contained"
                sx={{ ...sharp, fontFamily: mono }}
                onClick={() => setSavedSnack(true)}
              >
                Save Preferences
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* ── SNACKBAR ─────────────────────────────────────────────────────────── */}
      <Snackbar
        open={savedSnack}
        autoHideDuration={3000}
        onClose={() => setSavedSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSavedSnack(false)}
          sx={{
            ...sharp,
            fontFamily: mono,
            fontSize: "0.78rem",
            bgcolor: "#111",
          }}
        >
          Changes saved successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
}
