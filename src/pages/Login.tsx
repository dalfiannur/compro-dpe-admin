import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import store from "store";
import { ChangeEvent, useEffect } from "react";
import { useFormik } from "formik";
import { usePostLoginMutation } from "../services";
import { useNavigate } from 'react-router-dom'

const theme = createTheme();

export default () => {
  const navigate = useNavigate();
  const [onSubmit, { isLoading, data, error }] = usePostLoginMutation();

  const { submitForm, values, setFieldValue, setFieldError, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit,
    });

  useEffect(() => {
    if (error) {
      const {
        data: { errors: _errors },
      } = error as any;
      _errors.forEach((err: any) => {
        setFieldError(err.field, err.message);
      });
    }

    if (data) {
      store.set("token", data.token);
      navigate("/dashboard");
    }
  }, [isLoading, data, error]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="div" sx={{ mt: 1 }}>
            <TextField
              value={values.email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={touched.email && !!errors.email}
              helperText={errors.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFieldValue("email", e.target.value)
              }
            />
            <TextField
              value={values.password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={touched.password && !!errors.password}
              helperText={errors.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFieldValue("password", e.target.value)
              }
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={submitForm}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};