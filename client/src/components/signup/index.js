
import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Checkbox, FormControlLabel, Button, Link as MuiLink, CssBaseline, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; 
import Helmet from 'react-helmet';

import './index.scss';

function SignupForm({ onLogin }) {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setComfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();


    function checkPassword() {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');  // Reset the error message if passwords match
    return true;
  }



    const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkPassword()) return;

    console.log('login');
    if (typeof onLogin === 'function') {
      onLogin();
    }
    navigate('/login'); // Navigate to the home page
  };



//   function checkPassword() {
//     if (password === confirmPassword) {
//         return true;
//         } else {
//             alert('Passwords do not match!');
//             }
//   }


  return (
    <Container component="main" maxWidth={false}>
      <CssBaseline />
      <Helmet>
        <title>Sign in</title>
        <meta name="description" content="" />
      </Helmet>

      <Paper elevation={3} className="login-paper">
        <Typography variant="h5">Sign Up</Typography>
        <form className="login-form" onSubmit={handleSubmit}>
             <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="First Name"
            label="First Name"
            name="First Name"
            autoComplete="First Name"
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='custom-textfield'
          />

           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Last Name"
            label="Last Name"
            name="Last Name"
            autoComplete="Last Name"
            autoFocus
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='custom-textfield'
          />
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
            label={passwordError ? passwordError : 'Password'}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={passwordError ? passwordError : 'Confirm Password'}
            type="password"
            id="password"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setComfirmPassword(e.target.value)}
          />

          {/* <FormControlLabel
            control={
              <Checkbox
                value={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label={<Typography className="checkbox-label">Remember me</Typography>}
          /> */}
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