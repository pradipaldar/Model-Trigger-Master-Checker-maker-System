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

import { updateModule } from "../api/moduleApi";

export default function EditModuleDialog({
  open,
  onClose,
  module,
  onSuccess
}) {

  const [form, setForm] = useState({});

  useEffect(() => {

    if (module) {

      setForm(module);
    }

  }, [module]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {

    try {

      await updateModule(
        form.id,
        form
      );

      alert("Module Updated");

      onSuccess();

      onClose();

    } catch (error) {

      console.log(error);

      alert("Update Failed");
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
        Edit Module
      </DialogTitle>

      <DialogContent>

        {/* Read Only Fields */}

        <TextField
          fullWidth
          margin="normal"
          label="Model Name"
          value={form.model_name || ""}
          InputProps={{
            readOnly: true
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Jar Name"
          value={form.jar_name || ""}
          InputProps={{
            readOnly: true
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          type="date"
          label="Holiday Date"
          value={form.holiday_date || ""}
          InputProps={{
            readOnly: true
          }}
          InputLabelProps={{
            shrink: true
          }}
        />

        {/* Editable Fields */}

        <TextField
          fullWidth
          margin="normal"
          type="time"
          label="Start Time"
          name="start_time"
          value={form.start_time || ""}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          type="time"
          label="End Time"
          name="end_time"
          value={form.end_time || ""}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Service Status"
          name="service_status"
          value={form.service_status || ""}
          onChange={handleChange}
        >

          <MenuItem value="RUNNING">
            RUNNING
          </MenuItem>

          <MenuItem value="STOPPED">
            STOPPED
          </MenuItem>

        </TextField>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
}