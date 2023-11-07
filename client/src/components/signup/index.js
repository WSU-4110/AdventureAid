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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('attempting singup');

    if (typeof onLogin === 'function') {
      onLogin();
    }
    navigate('/login'); // Navigate to the home page
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit-button"
          >
            Make my Account!
          </Button>
          <Box className="navigate-to-login">
            <Typography variant="body2">Already have an account?</Typography>
            <Link to="/login">Login here</Link>
          </Box>
          {/* <div className="forgot-password">
            <Link href="#">Forgot password?</Link>
          </div> */}
        </form>
      </Paper>
    </Container>
  );
}

export default SignupForm;
