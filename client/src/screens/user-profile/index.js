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

    const handleChangePassword = () => {
        // Logic to change password
        console.log("Change password requested");
    };

    const handleDeleteAccount = async () => {
        // Replace '/api/deleteUser' with your actual backend endpoint for deleting users
        const response = await fetch(`/api/userdelete/${userDetails.userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Include any authentication headers your API requires
            },
        });

        if (response.ok) {
            console.log("Account deleted successfully");
            // Here you can handle the logout process, like clearing user details from state
            // And redirecting to the login page
            setUserDetails({ email: '', userId: null });
            // Redirect to login page or home page as needed
        } else {
            console.error("Failed to delete account");
            // Here you can handle the error, like showing a message to the user
        }
    };

    return (
   <UserProfileBox 
   userEmail={userDetails.email}
   userPassword="********" // It's unusual to handle passwords this way, this is a placeholder
   userId={userDetails.userId}
   onDeleteAccount={handleDeleteAccount}
   />
    );
}

export default UserProfile;
