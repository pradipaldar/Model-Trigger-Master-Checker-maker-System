import React, { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Chip
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import MainLayout from "../../layouts/MainLayout";

import { getAuditLogs } from "../../api/auditApi";

export default function AuditLogs() {

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const loadAuditLogs = async () => {
    try {

      setLoading(true);

      const data = await getAuditLogs();

      setRows(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.log(error);

      setRows([]);

    } finally {

      setLoading(false);
    }
  };

  const getActionColor = (action) => {

    if (
      action?.includes("APPROVED")
    ) {
      return "success";
    }

    if (
      action?.includes("REJECTED")
    ) {
      return "error";
    }

    return "primary";
  };

  const columns = [

    {
      field: "auditId",
      headerName: "Audit ID",
      width: 120
    },

    {
      field: "userId",
      headerName: "User ID",
      width: 120
    },

    {
      field: "moduleId",
      headerName: "Module ID",
      width: 130
    },

    {
      field: "actionType",
      headerName: "Action Type",
      flex: 1,
      minWidth: 220,

      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getActionColor(params.value)}
          size="small"
        />
      )
    },

    {
      field: "remarks",
      headerName: "Remarks",
      flex: 1,
      minWidth: 250
    },

    {
      field: "actionTime",
      headerName: "Action Time",
      flex: 1,
      minWidth: 220,

      valueGetter: (value) =>
        value
          ? new Date(value).toLocaleString()
          : "-"
    }

  ];

  return (

    <MainLayout>

      <Box
        sx={{
          width: "100%"
        }}
      >

        <Box sx={{ mb: 3 }}>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1e293b"
            }}
          >
            Audit Logs
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
          >
            View all user activities and approval history
          </Typography>

        </Box>

        <Paper
          elevation={6}
          sx={{
            width: "100%",
            borderRadius: 4,
            overflow: "hidden",
            p: 2
          }}
        >

          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            autoHeight
            getRowId={(row) =>
              row.auditId
            }
            pageSizeOptions={[
              10,
              20,
              50
            ]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10
                }
              }
            }}
            disableRowSelectionOnClick
            sx={{
              border: "none",

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f8fafc",
                fontSize: "15px",
                fontWeight: "bold"
              },

              "& .MuiDataGrid-cell": {
                fontSize: "14px"
              },

              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f1f5f9"
              }
            }}
          />

        </Paper>

      </Box>

    </MainLayout>

  );

  
}