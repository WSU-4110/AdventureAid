import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import './index.scss';

import { useNavigate } from 'react-router-dom';

function UserProfileBox({ userEmail, userPassword, handleSignout, handleAccountDeletion }) {


 const navigate = useNavigate();

 const returnToHome = () => {
  
    navigate('/');
  }


  return (
    <Box className='user-profile-container'>
      <Typography variant="h6" gutterBottom className="profile-header">
        User Profile
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Typography variant="body1" gutterBottom className="profile-info">
        Email: {userEmail}
      </Typography>
      <Typography variant="body1" gutterBottom className="profile-info">
        Password: {userPassword}
      </Typography>

      <Box className="profile-actions">
        <Button variant="outlined" className="primary" onClick={returnToHome}>
          Return to Home Page
        </Button>
        <Button variant="outlined" className="error" onClick={handleAccountDeletion}>
          Delete Account
        </Button>
        <Button variant="outlined" className="default" onClick={handleSignout}>
          Sign out
        </Button>
      </Box>
    </Box>
  );
}

export default UserProfileBox;
