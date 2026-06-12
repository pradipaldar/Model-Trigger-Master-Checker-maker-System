import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Chip
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "User";
  const role = localStorage.getItem("role") || "MAKER";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        left: 0,
        right: 0,
        width: "100%",
        backgroundColor: "#ffffff",
        color: "#0f172a",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        overflowX: "hidden"
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 70,
          px: 2,
          display: "flex",
          alignItems: "center",
          width: "100%"
        }}
      >
        {/* LEFT: TITLE */}
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1,
              whiteSpace: "nowrap"
            }}
          >
            Approval Workflow
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "#64748b",
              letterSpacing: 0.5,
              whiteSpace: "nowrap"
            }}
          >
            MAKER - CHECKER MANAGEMENT
          </Typography>
        </Box>

        {/* PUSH RIGHT */}
        <Box sx={{ flexGrow: 1 }} />

        {/* ROLE */}
        <Chip
          label={role}
          size="small"
          sx={{
            mr: 2,
            height: 30,
            fontWeight: 700,
            bgcolor: role === "CHECKER" ? "#dcfce7" : "#dbeafe",
            color: role === "CHECKER" ? "#15803d" : "#1d4ed8",
            borderRadius: "8px",
            flexShrink: 0
          }}
        />

        {/* USER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 2,
            minWidth: 0
          }}
        >
          <Avatar
            sx={{
              width: 38,
              height: 38,
              bgcolor: "#2563eb",
              mr: 1.2,
              flexShrink: 0
            }}
          >
            <AccountCircleIcon />
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: 120
              }}
            >
              {username}
            </Typography>

            <Typography variant="caption" sx={{ color: "#64748b" }}>
              Logged In User
            </Typography>
          </Box>
        </Box>

        {/* LOGOUT */}
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 2,
            borderColor: "#e2e8f0",
            color: "#dc2626",
            flexShrink: 0,
            whiteSpace: "nowrap",

            "&:hover": {
              borderColor: "#dc2626",
              backgroundColor: "#fef2f2"
            }
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}