// LoginScreen.js
import React from "react";
import { CssBaseline, Grid } from '@mui/material';
import Helmet from 'react-helmet';

import LoginComponent from "../../components/login";
import './index.scss'; // Ensure your stylesheet is imported

function LoginScreen({ onLogin }) {
  return (
      
      // <Container maxWidth={false} className="hero-container">
        <>
      <CssBaseline /><Helmet>
        <title>Login</title>
        <meta name="description" content="" />
      </Helmet><Grid
        container
        justifyContent="center"
        alignItems="center"
        className="hero-container"
      >
        <Grid item xs={12} className="login-component" justifyContent="center" alignItems="center"> {/* Set item to take full width and use login-component class */}
          <LoginComponent onLogin={onLogin} />
        </Grid>
      </Grid></>
   
      
  );
}

export default LoginScreen;
