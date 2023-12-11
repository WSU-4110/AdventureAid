import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Container, Typography, TextField, Checkbox, FormControlLabel, Button, Link, CssBaseline, Paper, InputAdornment,IconButton } from '@mui/material';
import Helmet from 'react-helmet';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import './index.scss';

function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMsg(''); 
  try { //below implemented the endpoint of login
    const response = await axios.post('http://localhost:3001/api/loginuser', {
      email,
      password,
    });
    
    const { Token, userId } = response.data;
console.log('token recall',response);//for test

    if (Token) { //storing the token and validating
      localStorage.setItem('authToken', Token);
      localStorage.setItem('userId', userId);
      if (onLogin) onLogin();
      navigate('/'); // Navigate to the home page
    } else {
      setErrorMsg('Login failed: No token received.');
    }
  } catch (error) { // if there is an error it will show the error message.
    if (error.response) {
      setErrorMsg(`Login failed: ${error.response.data.message}`);
    } else if (error.request) {
      setErrorMsg('Login failed: No response from the server.');
    } else {
      setErrorMsg('Login failed: An error occurred.');
    }
  }
};

  return (
    <Container component="main" maxWidth={false}>
      <CssBaseline />
      <Helmet>
        <title>Sign in</title>
        <meta name="description" content="" />
      </Helmet>

      <Paper elevation={3} className="login-paper">
        <Typography variant="h5">Sign in</Typography>
        {errorMsg && <div className="error-message">{errorMsg}</div>}
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
            className="custom-textfield"
          /><TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="custom-textfield"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              value={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              color="primary"
            />
          }
          label={<Typography className="checkbox-label">Remember me</Typography>}
        />
        <Button type="submit" variant="contained" className="custom-button">
          Sign In
        </Button>
        <div className="forgot-password">
          <Link href="#" onClick={(e) => e.preventDefault()}>Forgot password?</Link>
        </div>
      </form>
    </Paper>
  </Container>
);
}

export default LoginForm;