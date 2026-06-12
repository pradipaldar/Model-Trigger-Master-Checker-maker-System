import React, { useState } from "react";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import { loginUser } from "../api/authApi";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {

    try {

      const token =
        await loginUser(form);

      localStorage.setItem(
        "token",
        token
      );

      const decoded =
        jwtDecode(token);

      localStorage.setItem(
        "userId",
        decoded.userId
      );

      localStorage.setItem(
        "role",
        decoded.role
      );

      localStorage.setItem(
        "username",
        decoded.sub
      );

      if (
        decoded.role === "CHECKER"
      ) {

        navigate(
          "/checker/dashboard"
        );

      } else {

        navigate(
          "/maker/dashboard"
        );
      }

    } catch (err) {

      setError(
        "Invalid Username or Password"
      );
    }
  };

  return (
    <Container maxWidth="sm">

      <Paper
        elevation={4}
        sx={{
          p: 4,
          mt: 10
        }}
      >

        <Typography
          variant="h4"
          textAlign="center"
          mb={3}
        >
          Maker Checker System
        </Typography>

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Username"
          name="username"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          margin="normal"
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleLogin}
        >
          Login
        </Button>

      </Paper>
    </Container>
  );
}