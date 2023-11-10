import React from "react";
import { CssBaseline, Grid, Box, Typography, Button } from '@mui/material';
import Helmet from 'react-helmet';

import SignupForm from "../../components/signup";
import { useNavigate } from 'react-router-dom';

import './index.scss'; // Ensure your stylesheet is imported correctly

function SignUpScreen({ onLogin }) {
  const navigate = useNavigate();
  const handleHaveAnAccount = () => {
    navigate('/login');
  }

  return (
    <>
      <CssBaseline />
      <Helmet>
        <title>Sign up - Adventure Aid</title>
        <meta name="description" content="Join Adventure Aid and start planning your next journey!" />
      </Helmet>
      
      <Grid container direction={"column"} className="hero-container">
        <Grid item>
          <Box className="logo-col">
            <Typography variant="h5" component="h2" className="account-query" mb="2rem"> Already Have an Account? </Typography>
            
            
            <Button variant="contained" onClick={handleHaveAnAccount} className="sign-in-button"> Sign in </Button>
          </Box>
        </Grid>
        <Grid item xs="auto" className="login-component"> 
          <SignupForm />
        </Grid>
      </Grid>
    </>
  );
}

export default SignUpScreen;

