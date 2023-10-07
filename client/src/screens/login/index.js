import React from "react"   
import { Container, Grid, CssBaseline} from '@mui/material';
import Helmet from 'react-helmet';


import Logo from "../../assets/img/logo.svg";
import LoginComponent from "../../components/login";

function LoginScreen() {
  return (
    <Container component="main" maxWidth={false}>
      <CssBaseline />
      <Helmet>
        <title>Login</title>
        <meta name="description" content="" />
      </Helmet>
      <Grid container spacing={2}>
        <Grid item xs={6}>
            <img src={Logo} alt="logo" />
        </Grid>
        <Grid item xs={6}>
            <LoginComponent />
            </Grid>
      </Grid>
    </Container>
  );
}


export default LoginScreen;