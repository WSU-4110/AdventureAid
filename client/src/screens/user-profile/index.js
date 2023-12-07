import React, { useState } from 'react';
import { Container, CssBaseline, Box, Typography, Button, TextField, Grid } from '@mui/material';
import UserProfileBox from '../../components/user-profile';


import './index.scss';

function UserProfile({onSignout}) {
    // Assuming you will fetch these details from your backend or context
    const [userDetails, setUserDetails] = useState({
        email: 'user@example.com',
        userId: 'null' ,// Placeholder text for password
    });
  

    return (
            <>
        

  <Grid container direction={"column"} className="hero-container">
        <Grid item>
          <Box className="logo-col">
            <Typography variant="h5" component="h2" className="user-profile-text" mb="2rem"> User Profile </Typography>
          </Box>
        </Grid>
        <Grid item xs="auto" className="login-component"> 
          <UserProfileBox handleSignout={onSignout} />
        </Grid>
      </Grid>
      </>
    );
}

export default UserProfile;
