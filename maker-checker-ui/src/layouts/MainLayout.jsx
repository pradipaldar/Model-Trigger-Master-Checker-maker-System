import { Box } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  const drawerWidth = 260;
  const headerHeight = 70; // 🔥 IMPORTANT (matches your AppBar)

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        bgcolor: "#f8fafc", // optional clean background
      }}
    >
      {/* SIDEBAR */}
      <Box
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          height: "100vh",
          overflow: "hidden",
          borderRight: "1px solid #e2e8f0",
        }}
      >
        <Sidebar />
      </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            height: headerHeight,
            flexShrink: 0,
          }}
        >
          <Header />
        </Box>

        {/* PAGE CONTENT */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            overflow: "auto",

            // 🔥 TOP SPACE FIX (prevents content hiding under header)
            pt: 3,
            px: 3,
            pb: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}