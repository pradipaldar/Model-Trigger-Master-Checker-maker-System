import React, { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import MainLayout from "../../layouts/MainLayout";

import {
  getPendingApprovals,
  approveRequest,
  rejectRequest
} from "../../api/approvalApi";

export default function PendingApprovals() {

  const [rows, setRows] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [remark, setRemark] = useState("");

  const checkerId = localStorage.getItem("userId");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getPendingApprovals();
      setRows(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setRows([]);
    }
  };

  const handleOpenDialog = (id, type) => {
    setSelectedId(id);
    setActionType(type);
    setRemark("");
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    if (!remark.trim()) return;

    try {
      if (actionType === "APPROVE") {
        await approveRequest(selectedId, checkerId, remark);
        alert("Request Approved Successfully");
      } else {
        await rejectRequest(selectedId, checkerId, remark);
        alert("Request Rejected Successfully");
      }

      setOpenDialog(false);
      setRemark("");
      loadData();

    } catch (error) {
      console.log(error);
    }
  };

  const columns = [

    {
      field: "approvalId",
      headerName: "Approval ID",
      flex: 0.8,
      minWidth: 120
    },
    {
      field: "moduleId",
      headerName: "Module ID",
      flex: 0.8,
      minWidth: 120
    },
    {
      field: "normalUserId",
      headerName: "Maker",
      flex: 0.8,
      minWidth: 100
    },
    {
      field: "newStartTime",
      headerName: "Start Time",
      flex: 1,
      minWidth: 120
    },
    {
      field: "newEndTime",
      headerName: "End Time",
      flex: 1,
      minWidth: 120
    },
    {
      field: "newServiceStatus",
      headerName: "Status",
      flex: 1,
      minWidth: 130
    },

    
    {
      field: "remarks",
      headerName: "Maker Remarks",
      flex: 1.5,
      minWidth: 180,
      renderCell: (params) => {
        const value =
          params.row?.remarks ||
          params.row?.makerRemarks ||
          params.row?.checkerRemarks;

        // prevent showing fake "Pending Review"
        if (!value || value === "PENDING" || value === "Pending Review") {
          return <span style={{ color: "#9ca3af" }}>-</span>;
        }

        return (
          <span
            style={{
              whiteSpace: "normal",
              wordBreak: "break-word"
            }}
          >
            {value}
          </span>
        );
      }
    },

    {
      field: "action",
      headerName: "Actions",
      flex: 1.6,
      minWidth: 240,
      sortable: false,

      renderCell: (params) => (
        <Stack direction="row" spacing={1} sx={{ justifyContent: "center", width: "100%" }}>

          <Button
            variant="contained"
            color="success"
            size="small"
            startIcon={<CheckCircleIcon />}
            onClick={() => handleOpenDialog(params.row.approvalId, "APPROVE")}
          >
            Approve
          </Button>

          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<CancelIcon />}
            onClick={() => handleOpenDialog(params.row.approvalId, "REJECT")}
          >
            Reject
          </Button>

        </Stack>
      )
    }
  ];

  return (
    <MainLayout>

      <Box sx={{ width: "100%" }}>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Pending Approvals
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Review and approve maker requests
        </Typography>

        <Paper elevation={6} sx={{ borderRadius: 4, p: 2 }}>

          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.approvalId}
            autoHeight
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 }
              }
            }}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f8fafc",
                fontWeight: "bold"
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f1f5f9"
              }
            }}
          />

        </Paper>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          fullWidth
          maxWidth="sm"
        >

          <DialogTitle>
            {actionType === "APPROVE" ? "Approve Request" : "Reject Request"}
          </DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Enter Remarks"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              sx={{ mt: 2 }}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color={actionType === "APPROVE" ? "success" : "error"}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </DialogActions>

        </Dialog>

      </Box>

    </MainLayout>
  );
}