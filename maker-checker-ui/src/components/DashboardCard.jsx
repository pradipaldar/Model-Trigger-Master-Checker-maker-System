import {
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function DashboardCard({
  title,
  value
}) {

  const getConfig = () => {

    switch (title) {

      case "Total Modules":
        return {
          icon: <Inventory2Icon />,
          bg: "#eff6ff",
          color: "#2563eb"
        };

      case "Running Modules":
        return {
          icon: <PlayCircleFilledIcon />,
          bg: "#dcfce7",
          color: "#16a34a"
        };

      case "Pending Approvals":
        return {
          icon: <PendingActionsIcon />,
          bg: "#fef3c7",
          color: "#d97706"
        };

      case "Approved Requests":
        return {
          icon: <CheckCircleIcon />,
          bg: "#dcfce7",
          color: "#15803d"
        };

      case "Rejected Requests":
        return {
          icon: <CancelIcon />,
          bg: "#fee2e2",
          color: "#dc2626"
        };

      default:
        return {
          icon: <Inventory2Icon />,
          bg: "#f1f5f9",
          color: "#475569"
        };
    }
  };

  const config = getConfig();

  return (
    <Card
      elevation={0}
      sx={{
        height: 140,
        borderRadius: 4,
        border: "1px solid #e2e8f0",
        backgroundColor: "#ffffff",
        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow:
            "0 12px 24px rgba(15,23,42,0.08)"
        }
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          p: 3,
          "&:last-child": {
            pb: 3
          }
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Box>

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: "#64748b",
                mb: 1
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontSize: 34,
                fontWeight: 700,
                color: "#0f172a",
                lineHeight: 1
              }}
            >
              {value}
            </Typography>

          </Box>

          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              bgcolor: config.bg,
              color: config.color,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              "& svg": {
                fontSize: 32
              }
            }}
          >
            {config.icon}
          </Box>

        </Box>
      </CardContent>
    </Card>
  );
}