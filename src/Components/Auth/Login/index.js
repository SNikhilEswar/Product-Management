import * as React from 'react';
import {Avatar,Button,CssBaseline,TextField,Box,Typography,Container} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// project imports
import { useApi } from '../../Context/ApiContext';

// third party
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('UserName is required'),
  password: Yup.string().required('Password is required'),
});



const defaultTheme = createTheme();

export default function SignIn() {


      // Navigation hook for redirection
    const navigate = useNavigate();

    // State for username and password inputs
    const [account, setAccount] = React.useState({ username: "", password: "" });

 

    // Custom hook for api
    const { handleUserLogin } = useApi();


    const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        // Handle form submission (e.g., login logic)
        handleUserLogin(values, setAccount, navigate);
      },
    });
    

//     // Render the component with Material-UI components

  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  </ThemeProvider>
  );
}
