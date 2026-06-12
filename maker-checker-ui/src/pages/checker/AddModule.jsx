import React, { useState } from "react";

import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
  Box
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

import MainLayout from "../../layouts/MainLayout";

import { addModule } from "../../api/moduleApi";

export default function AddModule() {

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    model_name: "",
    jar_name: "",
    holiday_date: "",
    start_time: "",
    end_time: "",
    service_status: "RUNNING"
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    try {

      await addModule(form);

      setMessage(
        "Module Added Successfully"
      );

      setForm({
        model_name: "",
        jar_name: "",
        holiday_date: "",
        start_time: "",
        end_time: "",
        service_status: "RUNNING"
      });

    } catch (err) {

      console.error(err);

      setError(
        "Failed To Add Module"
      );
    }
  };

  return (

    <MainLayout>

      <Box sx={{ mb: 3 }}>

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Add New Module
        </Typography>

        <Typography
          color="text.secondary"
        >
          Create and configure a new module
        </Typography>

      </Box>

      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 1100,
          mx: "auto"
        }}
      >

        {message && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
          >
            {message}
          </Alert>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>

          <Grid
            container
            spacing={3}
          >

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Model Name"
                name="model_name"
                value={form.model_name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Jar Name"
                name="jar_name"
                value={form.jar_name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Holiday Date"
                name="holiday_date"
                value={form.holiday_date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="Start Time"
                name="start_time"
                value={form.start_time}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="End Time"
                name="end_time"
                value={form.end_time}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Service Status"
                name="service_status"
                value={form.service_status}
                onChange={handleChange}
              >
                <MenuItem value="RUNNING">
                  RUNNING
                </MenuItem>

                <MenuItem value="STOPPED">
                  STOPPED
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>

              <Button
                variant="contained"
                size="large"
                type="submit"
                startIcon={<SaveIcon />}
                sx={{
                  px: 4,
                  py: 1.2,
                  borderRadius: 2,
                  fontWeight: "bold"
                }}
              >
                Save Module
              </Button>

            </Grid>

          </Grid>

        </form>

      </Paper>

    </MainLayout>
  );
}