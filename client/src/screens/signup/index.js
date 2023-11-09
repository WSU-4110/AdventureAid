// LoginScreen.js
import React from "react";
import { CssBaseline, Grid, Box, Typography, Button } from '@mui/material';
import Helmet from 'react-helmet';

import SignupForm from "../../components/signup";

import { useNavigate } from 'react-router-dom';

import './index.scss'; // Ensure your stylesheet is imported

function SignUpScreen({ onLogin }) {


  const navigate = useNavigate();
   const handleHaveAnAccount = () => {
     navigate('/login');
    }


  return (
      
      // <Container maxWidth={false} className="hero-container">
        <>
      <CssBaseline />
      <Helmet>
        <title>Sign up</title>
        <meta name="description" content="" />
      </Helmet>
      
      <Grid
        container
        direction={"column"}
        className="hero-container" 
      >
        <Grid item>
          <Box className="logo-col">
            <Typography variant="subtitle1" className="logo-text">
              Already have an account?
            </Typography>
            <Button variant="h4" className="logo-text" onClick={handleHaveAnAccount}>
              <Typography variant="h4" style={{ textDecoration: "none" }}> Sign in </Typography>
            </Button>
          </Box>
        </Grid>
        <Grid item xs="auto" className="login-component"> 
        <SignupForm />
        </Grid>
      </Grid></>
   
      
  );
}

export default SignUpScreen;
