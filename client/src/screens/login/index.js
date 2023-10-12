// LoginScreen.js
import React from "react";
import { CssBaseline, Grid, Box, Typography } from '@mui/material';
import Helmet from 'react-helmet';

import LoginForm from "../../components/login";

import logo from "../../assets/img/logo/logo-name1.png"

import './index.scss'; // Ensure your stylesheet is imported

function LoginScreen({ onLogin }) {
  return (
    <>
      <CssBaseline />
      <Helmet>
        <title>Login</title>
        <meta name="description" content="" />
      </Helmet>
      <Grid
        container
        className="hero-container" 
      >
        <Grid item>
          <Box className="logo-col">
            <Typography variant="h3" className="logo-text">
              Welcome to
            </Typography>
            <img src={logo} alt="logo" className="logo-img" />
          </Box>
        </Grid>
        <Grid item xs="auto" className="login-component"> 
          <LoginForm onLogin={onLogin} />
        </Grid>
      </Grid>
    </>
  );
}

export default LoginScreen;
