// LoginScreen.js
import React from "react";
import { CssBaseline, Grid, Box, Typography, Button } from '@mui/material';
import Helmet from 'react-helmet';

import LoginForm from "../../components/login";

// import logo from "../../assets/img/logo/logo-name1.png"

import './index.scss'; // Ensure your stylesheet is imported


import { useNavigate } from 'react-router-dom';

function LoginScreen({ onLogin }) {


  const navigate = useNavigate();

   const handleNewHere = () => {
     navigate('/signup');
    }

  return (
      
      // <Container maxWidth={false} className="hero-container">
        <>
      <CssBaseline />
      <Helmet>
        <title>Login</title>
        <meta name="description" content="" />
      </Helmet><Grid
        container
        direction={"column"}
        className="hero-container" 
      >
        <Grid item>
          <Box className="logo-col">
            <Button variant="h4" className="logo-text" onClick={handleNewHere}>
              New here?
            </Button>
            {/* <img src={logo} alt="logo" className="logo-img" /> */}
          </Box>
        </Grid>

        <Grid item>
          <Box>
            <Typography variant="h2" className="logo-text">
              Sign in?
            </Typography>
          </Box>
          </Grid>

        <Grid item xs="auto" className="login-component"> 
          <LoginForm onLogin={onLogin} navigate={navigate} />
        </Grid>
      </Grid></>
   
      
  );
}

export default LoginScreen;
