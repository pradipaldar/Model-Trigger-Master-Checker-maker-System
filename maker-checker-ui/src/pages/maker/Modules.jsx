import React, { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Card,
  CardContent,
  Grid
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import StorageIcon from "@mui/icons-material/Storage";

import { DataGrid } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import StatusChip from "../../components/StatusChip";
import EditModuleDialog from "../../components/EditModuleDialog";
import RequestChangeDialog from "../../components/RequestChangeDialog";

import { getModules } from "../../api/moduleApi";

export default function Modules() {

  const navigate = useNavigate();

  const [modules, setModules] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedModule, setSelectedModule] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);

  const role = localStorage.getItem("role");

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      const data = await getModules();
      setModules(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setModules([]);
    }
  };

  const handleEdit = (row) => {
    setSelectedModule(row);
    setOpenEdit(true);
  };

  const handleRequestChange = (row) => {
    setSelectedModule(row);
    setOpenRequest(true);
  };

  const filteredRows = modules.filter((module) =>
    module?.model_name?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70
    },
    {
      field: "model_name",
      headerName: "Model Name",
      flex: 1,
      minWidth: 160
    },
    {
      field: "jar_name",
      headerName: "Jar Name",
      flex: 1,
      minWidth: 160
    },
    {
      field: "holiday_date",
      headerName: "Holiday Date",
      width: 120
    },
    {
      field: "start_time",
      headerName: "Start",
      width: 110
    },
    {
      field: "end_time",
      headerName: "End",
      width: 110
    },
    {
      field: "service_status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => <StatusChip status={params.value} />
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      sortable: false,
      renderCell: (params) =>
        role === "CHECKER" ? (
          <Button
            size="small"
            variant="contained"
            sx={{ borderRadius: 2, textTransform: "none" }}
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
        ) : (
          <Button
            size="small"
            variant="outlined"
            sx={{ borderRadius: 2, textTransform: "none" }}
            onClick={() => handleRequestChange(params.row)}
          >
            Request
          </Button>
        )
    }
  ];

  return (
    <MainLayout>

      {/* HEADER */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Module Management
        </Typography>

        <Typography color="text.secondary">
          Manage and monitor all available modules
        </Typography>
      </Box>

      {/* SUMMARY */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 4 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <StorageIcon sx={{ fontSize: 40, color: "#2563eb" }} />
                <Box>
                  <Typography color="text.secondary">
                    Total Modules
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {modules.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* TABLE */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 4,
          border: "1px solid #e2e8f0",
          width: "100%",
          overflow: "hidden"
        }}
      >
        {/* SEARCH + BUTTON */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2
          }}
        >
          <TextField
            placeholder="Search module..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />

          {role === "CHECKER" && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ borderRadius: 2, textTransform: "none" }}
              onClick={() => navigate("/checker/add-module")}
            >
              Add Module
            </Button>
          )}
        </Box>

        {/* DATA GRID */}
        <Box sx={{ width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 }
              }
            }}
            density="compact"
            sx={{
              border: "none",

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f8fafc",
                borderBottom: "1px solid #e2e8f0"
              },

              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #f1f5f9",
                fontSize: 13
              },

              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f8fafc"
              }
            }}
          />
        </Box>
      </Paper>

      {/* DIALOGS */}
      <EditModuleDialog
        open={openEdit}
        module={selectedModule}
        onClose={() => setOpenEdit(false)}
        onSuccess={loadModules}
      />

      <RequestChangeDialog
        open={openRequest}
        module={selectedModule}
        onClose={() => setOpenRequest(false)}
      />

    </MainLayout>
  );
}