import React, { useState } from 'react';
import { Container, Typography, TextField, Button, CssBaseline, Paper, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; 
import Helmet from 'react-helmet';
import './index.scss';

function SignupForm({ onLogin }) {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('attempting singup');

  setError('');

  //post method implement and endpoint
  try {
    const response = await fetch('http://localhost:3001/api/signup', { // postman method tried on this link http://localhost:3001/api/signup and api/loginuser for login
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Signup successful', data);
      // Call onLogin function if it exists, otherwise navigate to login page
      if (typeof onLogin === 'function') {
        onLogin(data); // Pass any needed data to onLogin
      } else {
        navigate('/login'); // Navigate to the login page
      }
    } else {
      // If the server response was not ok, handle errors
      setError(data.message || 'Failed to sign up. Please try again.');
    }
  } catch (error) {
    // If there was an error sending the request, handle it here
    console.error('There was an error submitting the form', error);
    setError('Network error, please try again later.');
  }
};

  return (
    <Container component="main" maxWidth={false}>
      <CssBaseline />
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Signup Page" />
      </Helmet>

      <Paper elevation={3} className="login-paper">
        <Typography variant="h5">Sign Up</Typography>
        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='custom-textfield'
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={error ? error : 'Password'}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='custom-textfield'
          />
          
          <Button
            style={{ marginTop: '1rem' }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit-button"
          >
            Make my Account!
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default SignupForm;
