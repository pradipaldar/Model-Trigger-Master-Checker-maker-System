import React, { useEffect, useState } from "react";

import { Paper, Typography, Box, Grid, Card, CardContent } from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import { DataGrid } from "@mui/x-data-grid";

import MainLayout from "../../layouts/MainLayout";
import StatusChip from "../../components/StatusChip";

import { getMyRequests } from "../../api/approvalApi";

export default function MyRequests() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);

      const data = await getMyRequests(userId);

      console.log("MY REQUESTS DATA =", data);

      setRows(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      field: "approvalId",
      headerName: "Approval ID",
      width: 110,
    },
    {
      field: "moduleId",
      headerName: "Module ID",
      width: 110,
    },
    {
      field: "newStartTime",
      headerName: "Start Time",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "newEndTime",
      headerName: "End Time",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "newServiceStatus",
      headerName: "Requested Status",
      flex: 1,
      minWidth: 160,
    },

    // Maker Remarks
    {
      field: "remarks",
      headerName: "Maker Remarks",
      flex: 1,
      minWidth: 220,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: 1.4,
            py: 1,
          }}
        >
          {params.row?.remarks || "-"}
        </Typography>
      ),
    },

    // Checker Remarks
    {
      field: "checkerRemark",
      headerName: "Checker Remarks",
      flex: 1.2,
      minWidth: 250,

      renderCell: (params) => {
        let remark = params.row?.checkerRemark;

        try {
          if (typeof remark === "string" && remark.startsWith("{")) {
            remark = JSON.parse(remark).checkerRemark;
          }
        } catch (e) {
          console.log(e);
        }

        return (
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
          >
            {remark || "Pending Review"}
          </Typography>
        );
      },
    },

    {
      field: "approvalStatus",
      headerName: "Status",
      width: 130,
      renderCell: (params) => <StatusChip status={params.value} />,
    },

    {
      field: "requestDate",
      headerName: "Request Date",
      flex: 1,
      minWidth: 180,
      valueGetter: (value) => (value ? new Date(value).toLocaleString() : "-"),
    },

    {
      field: "approvalDate",
      headerName: "Approval Date",
      flex: 1,
      minWidth: 180,
      valueGetter: (value) => (value ? new Date(value).toLocaleString() : "-"),
    },
  ];

  return (
    <MainLayout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          My Requests
        </Typography>

        <Typography color="text.secondary">
          Track your submitted approval requests
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid #e2e8f0",
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <AssignmentIcon color="primary" fontSize="large" />

                <Box>
                  <Typography color="text.secondary">Total Requests</Typography>

                  <Typography variant="h5" fontWeight={700}>
                    {rows.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 3,
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.approvalId}
          disableRowSelectionOnClick
          autoHeight
          density="compact"
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sx={{
            border: "none",

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f8fafc",
              borderBottom: "1px solid #e2e8f0",
            },

            "& .MuiDataGrid-cell": {
              fontSize: 13,
              padding: "6px 8px",
              alignItems: "center",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f8fafc",
            },
          }}
        />
      </Paper>
    </MainLayout>
  );
}
