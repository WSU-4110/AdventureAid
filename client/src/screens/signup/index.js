// LoginScreen.js
import React from "react";
import { CssBaseline, Grid, Box, Typography } from '@mui/material';
import Helmet from 'react-helmet';

import SignupForm from "../../components/signup";

import logo from "../../assets/img/logo/logo-name1.png"

import './index.scss'; // Ensure your stylesheet is imported

function SignUpScreen({ onLogin }) {
  return (
      
      // <Container maxWidth={false} className="hero-container">
        <>
      <CssBaseline />
      <Helmet>
        <title>Sign up</title>
        <meta name="description" content="" />
      </Helmet><Grid
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
        <SignupForm />
        </Grid>
      </Grid></>
   
      
  );
}

export default SignUpScreen;
