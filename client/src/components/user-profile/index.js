import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';

function UserProfileBox({ userEmail, userPassword }) {
  const handlePasswordChange = () => {
    // Handle password change logic
    console.log('Password change requested');
  };

  const handleAccountDeletion = () => {
    // Handle account deletion logic
    console.log('Account deletion requested');
  };

  return (
    <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', maxWidth: 400, margin: 'auto', mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        User Profile
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Typography variant="body1" gutterBottom>
        Email: {userEmail}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Password: {userPassword}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
        <Button variant="outlined" color="primary" onClick={handlePasswordChange}>
          Return to Home Page
        </Button>
        <Button variant="outlined" color="error" onClick={handleAccountDeletion}>
          Delete Account
        </Button>
        <Button variant="outlined" color="inherit" onClick={handlePasswordChange}>
            Sign out
        </Button>
      </Box>
    </Box>
  );
}

// Example usage:
// <UserProfileBox userEmail="user@example.com" />

export default UserProfileBox;
