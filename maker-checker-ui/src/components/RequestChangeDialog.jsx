import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem
} from "@mui/material";

import { sendApprovalRequest } from "../api/approvalApi";

export default function RequestChangeDialog({
  open,
  onClose,
  module,
  onSuccess
}) {

  const [form, setForm] = useState({
    moduleId: "",
    normalUserId: "",
    newStartTime: "",
    newEndTime: "",
    newServiceStatus: "",
    remarks: ""
  });

  useEffect(() => {

    if (module) {

      setForm({
        moduleId: module.id,
        normalUserId: localStorage.getItem("userId"),
        newStartTime: module.start_time || "",
        newEndTime: module.end_time || "",
        newServiceStatus: module.service_status || "",
        remarks: ""
      });
    }

  }, [module]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {

    try {

      await sendApprovalRequest(form);

      alert("Request Submitted Successfully");

      if (onSuccess) {
        onSuccess();
      }

      onClose();

    } catch (error) {

      console.log(error);

      alert("Failed To Submit Request");
    }
  };

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>
        Request Module Change
      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Module Name"
          value={module?.model_name || ""}
          InputProps={{
            readOnly: true
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Current Status"
          value={module?.service_status || ""}
          InputProps={{
            readOnly: true
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          type="time"
          label="New Start Time"
          name="newStartTime"
          value={form.newStartTime}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          type="time"
          label="New End Time"
          name="newEndTime"
          value={form.newEndTime}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="New Service Status"
          name="newServiceStatus"
          value={form.newServiceStatus}
          onChange={handleChange}
        >

          <MenuItem value="RUNNING">
            RUNNING
          </MenuItem>

          <MenuItem value="STOPPED">
            STOPPED
          </MenuItem>

        </TextField>

        <TextField
          fullWidth
          multiline
          rows={4}
          margin="normal"
          label="Remarks"
          name="remarks"
          value={form.remarks}
          onChange={handleChange}
        />

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Submit Request
        </Button>

      </DialogActions>

    </Dialog>
  );
}