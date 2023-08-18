import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { loginUser } from '../../../redux/action';
import { useNavigate } from 'react-router-dom';
import NotiStackComponent from '../../../components/NotiStackComponent';
import GoogleLoginBtn from '../../../components/GoogleLoginBtn';
import InputBox from '../../../components/InputComponent';
import ButtonBox from '../../../components/ButtonComponent';

const defaultTheme = createTheme();


const Login = () => {
  const user = useSelector(state => state.product.user);

  const googleIdToken = user?.token;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notiComponent = NotiStackComponent();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };
  

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      localStorage.setItem('googleIdToken', googleIdToken);
      localStorage.setItem('userName', user?.username);
      dispatch(loginUser(formData));
      navigate('/');
      notiComponent.showSnackbar(`Welcome ${user?.username}!`, 'success');
    }
  };

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
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <InputBox
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              value={formData.username}
              onChange={handleInputChange}
              name="username"
              autoComplete="username"
              autoFocus
              helperText={errors.username}
                error={errors.username}
            />
            <InputBox
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password} 
              helperText={errors.password}
            />
            <ButtonBox
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              title="Sign In"
            /> 
          </Box>
        </Box>
     
    <div style={{marginTop:20}}>
        <GoogleLoginBtn
          buttonText="Login With Google"
          prompt={'select_account'} 
        />
        </div>
        </Container>
    </ThemeProvider>
   
  );
};

export default Login;
