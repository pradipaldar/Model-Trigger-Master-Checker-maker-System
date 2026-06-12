import React, {
  useEffect,
  useState
} from "react";

import {
  Grid,
  Typography,
  Box,
  CircularProgress
} from "@mui/material";

import MainLayout from "../../layouts/MainLayout";
import DashboardCard from "../../components/DashboardCard";

import {
  getDashboard
} from "../../api/dashboardApi";

export default function MakerDashboard() {

  const [dashboard, setDashboard] =
    useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const data =
        await getDashboard();

      setDashboard(data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!dashboard) {

    return (
      <MainLayout>
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (

    <MainLayout>

      {/* Page Header */}

      <Box
        sx={{
          mb: 3
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#0f172a",
            mb: 0.5
          }}
        >
          Maker Dashboard
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          Overview of modules and approval requests
        </Typography>
      </Box>

      {/* Dashboard Cards */}

      <Grid
        container
        spacing={2}
      >

        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Total Modules"
            value={dashboard.totalModules}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Running Modules"
            value={dashboard.runningModules}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Pending Approvals"
            value={dashboard.pendingApprovals}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DashboardCard
            title="Approved Requests"
            value={dashboard.approvedRequests}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DashboardCard
            title="Rejected Requests"
            value={dashboard.rejectedRequests}
          />
        </Grid>

      </Grid>

    </MainLayout>

  );
}