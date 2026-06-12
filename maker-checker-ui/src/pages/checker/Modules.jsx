import React, { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Grid,
  Card,
  CardContent
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Inventory2Icon from "@mui/icons-material/Inventory2";

import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import StatusChip from "../../components/StatusChip";
import EditModuleDialog from "../../components/EditModuleDialog";

import { getModules } from "../../api/moduleApi";

export default function Modules() {

  const navigate = useNavigate();

  const [modules, setModules] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedModule, setSelectedModule] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const role = localStorage.getItem("role");

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {

    try {

      const data = await getModules();

      setModules(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.log(error);

      setModules([]);
    }
  };

  const handleEdit = (row) => {

    setSelectedModule(row);

    setOpenEdit(true);
  };

  const filteredRows =
    modules.filter((module) =>
      module?.model_name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const columns = [

    {
      field: "id",
      headerName: "ID",
      width: 80
    },

    {
      field: "model_name",
      headerName: "Model Name",
      flex: 1
    },

    {
      field: "jar_name",
      headerName: "Jar Name",
      flex: 1
    },

    {
      field: "holiday_date",
      headerName: "Holiday",
      width: 140
    },

    {
      field: "start_time",
      headerName: "Start Time",
      width: 130
    },

    {
      field: "end_time",
      headerName: "End Time",
      width: 130
    },

    {
      field: "service_status",
      headerName: "Status",
      width: 150,

      renderCell: (params) => (
        <StatusChip
          status={params.value}
        />
      )
    },

    {
      field: "action",
      headerName: "Action",
      width: 180,

      renderCell: (params) => (

        role === "CHECKER" ? (

          <Button
            variant="contained"
            size="small"
            onClick={() =>
              handleEdit(
                params.row
              )
            }
          >
            Edit
          </Button>

        ) : (

          <Button
            variant="outlined"
            size="small"
          >
            Request Change
          </Button>

        )
      )
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
          Module Management
        </Typography>

        <Typography
          color="text.secondary"
        >
          Manage all application modules
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

                <Inventory2Icon
                  color="primary"
                  fontSize="large"
                />

                <Box>

                  <Typography
                    color="text.secondary"
                  >
                    Total Modules
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                  >
                    {modules.length}
                  </Typography>

                </Box>

              </Box>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

      {/* TABLE CARD */}

      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3
        }}
      >

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3
          }}
        >

          <TextField
            placeholder="Search module..."
            size="small"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            sx={{
              width: 350
            }}
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
              onClick={() =>
                navigate(
                  "/checker/add-module"
                )
              }
            >
              Add Module
            </Button>

          )}

        </Box>

        <DataGrid
          rows={filteredRows}
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
              backgroundColor:
                "#f5f7fa",
              fontWeight: "bold"
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor:
                "#f8fafc"
            }
          }}
        />

      </Paper>

      <EditModuleDialog
        open={openEdit}
        module={selectedModule}
        onClose={() =>
          setOpenEdit(false)
        }
        onSuccess={loadModules}
      />

    </MainLayout>
  );
}