import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField, Grid } from '@mui/material';
import UserProfileBox from '../../components/user-profile';

function UserProfile() {
    // Assuming you will fetch these details from your backend or context
    const [userDetails, setUserDetails] = useState({
        email: 'user@example.com',
        password: '********' // Placeholder text for password
    });

    const handleChangePassword = () => {
        // Logic to change password
        console.log("Change password requested");
    };

    const handleDeleteAccount = () => {
        // Logic to delete account
        console.log("Account deletion requested");
    };

    return (
   <UserProfileBox />
    );
}

export default UserProfile;
