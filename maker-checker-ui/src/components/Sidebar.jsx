import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ApprovalIcon from "@mui/icons-material/Approval";
import HistoryIcon from "@mui/icons-material/History";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FactCheckIcon from "@mui/icons-material/FactCheck";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

const drawerWidth = 260;

export default function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const role =
    localStorage.getItem("role");

  const makerMenu = [
    {
      label: "Dashboard",
      path: "/maker/dashboard",
      icon: <DashboardIcon />
    },
    {
      label: "Modules",
      path: "/maker/modules",
      icon: <StorageIcon />
    },
    {
      label: "My Requests",
      path: "/maker/requests",
      icon: <AssignmentIcon />
    }
  ];

  const checkerMenu = [
    {
      label: "Dashboard",
      path: "/checker/dashboard",
      icon: <DashboardIcon />
    },
    {
      label: "Modules",
      path: "/checker/modules",
      icon: <StorageIcon />
    },
    {
      label: "Add Module",
      path: "/checker/add-module",
      icon: <AddBoxIcon />
    },
    {
      label: "Pending Approvals",
      path: "/checker/approvals",
      icon: <ApprovalIcon />
    },
    {
      label: "Audit Logs",
      path: "/checker/audit",
      icon: <FactCheckIcon />
    },
    {
      label: "Login History",
      path: "/checker/history",
      icon: <HistoryIcon />
    }
  ];

  const menu =
    role === "CHECKER"
      ? checkerMenu
      : makerMenu;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e2e8f0"
        }
      }}
    >
      {/* Match Header Height */}
      <Box
        sx={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          px: 3,
          borderBottom: "1px solid #e2e8f0"
        }}
      >
        <Box>
          <Typography
            variant="h6"
            fontWeight={800}
            color="primary"
          >
            MCM
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Workflow System
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          px: 3,
          py: 2
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: "#64748b",
            letterSpacing: 1
          }}
        >
          {role}
        </Typography>
      </Box>

      <Divider />

      <List
        sx={{
          px: 2,
          py: 2
        }}
      >
        {menu.map((item) => {

          const active =
            location.pathname === item.path;

          return (
            <ListItemButton
              key={item.label}
              onClick={() =>
                navigate(item.path)
              }
              sx={{
                borderRadius: 3,
                mb: 1,

                minHeight: 52,

                backgroundColor:
                  active
                    ? "#eff6ff"
                    : "transparent",

                color:
                  active
                    ? "#2563eb"
                    : "#334155",

                "&:hover": {
                  backgroundColor:
                    active
                      ? "#dbeafe"
                      : "#f8fafc"
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color:
                    active
                      ? "#2563eb"
                      : "#64748b"
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight:
                    active
                      ? 700
                      : 500
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <Box
        sx={{
          p: 3
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
        >
          Maker Checker Management
        </Typography>

        <Typography
          variant="caption"
          display="block"
          color="text.secondary"
        >
          Version 1.0.0
        </Typography>
      </Box>
    </Drawer>
  );
}