// LoginScreen.js
import React from "react";
import { CssBaseline, Grid } from '@mui/material';
import Helmet from 'react-helmet';

import LoginComponent from "../../components/login";
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
        className="hero-container" // Use the hero-container class
      >
        <Grid item xs="auto" className="login-component"> {/* Set item to take full width and use login-component class */}
          <LoginComponent onLogin={onLogin} />
        </Grid>
      </Grid>
    </>
  );
}

export default LoginScreen;
