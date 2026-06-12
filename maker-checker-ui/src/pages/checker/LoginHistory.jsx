import React, { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";

import { DataGrid } from "@mui/x-data-grid";

import axios from "axios";

import MainLayout from "../../layouts/MainLayout";

export default function LoginHistory() {

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLoginHistory();
  }, []);

  const fetchLoginHistory = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost:8080/api/login-history"
      );

      const data = Array.isArray(response.data)
        ? response.data.map((item) => ({
            id: item.loginId,
            loginId: item.loginId,
            userId: item.userId,
            loginTime: item.loginTime || "-",
            logoutTime: item.logoutTime || "-",
            loginStatus: item.loginStatus || "-"
          }))
        : [];

      setRows(data);

    } catch (err) {

      console.error(
        "Login History Error:",
        err
      );

      setError(
        "Failed to load login history."
      );

    } finally {

      setLoading(false);
    }
  };

  const columns = [

    {
      field: "loginId",
      headerName: "Login ID",
      width: 130
    },

    {
      field: "userId",
      headerName: "User ID",
      width: 130
    },

    {
      field: "loginTime",
      headerName: "Login Time",
      flex: 1,
      minWidth: 220
    },

    {
      field: "logoutTime",
      headerName: "Logout Time",
      flex: 1,
      minWidth: 220
    },

    {
      field: "loginStatus",
      headerName: "Status",
      width: 150
    }
  ];

  return (

    <MainLayout>

      {/* PAGE HEADER */}

      <Box sx={{ mb: 3 }}>

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Login History
        </Typography>

        <Typography
          color="text.secondary"
        >
          Monitor user login and logout activities
        </Typography>

      </Box>

      {/* SUMMARY CARD */}

      <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Grid item xs={12} md={3}>

          <Card
            elevation={3}
            sx={{
              borderRadius: 3
            }}
          >
            <CardContent>

              <Box
                display="flex"
                alignItems="center"
                gap={2}
              >

                <LoginIcon
                  color="primary"
                  fontSize="large"
                />

                <Box>

                  <Typography
                    color="text.secondary"
                  >
                    Total Logins
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                  >
                    {rows.length}
                  </Typography>

                </Box>

              </Box>

            </CardContent>

          </Card>

        </Grid>
      </Grid>

      {/* TABLE SECTION */}

      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3
        }}
      >

        {error && (

          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>

        )}

        {loading ? (

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 300
            }}
          >
            <CircularProgress />
          </Box>

        ) : (

          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            pageSizeOptions={[
              5,
              10,
              20
            ]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10
                }
              }
            }}
            sx={{
              border: "none",

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f7fa",
                fontWeight: "bold"
              },

              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f8fafc"
              }
            }}
          />

        )}

      </Paper>

    </MainLayout>
  );
}