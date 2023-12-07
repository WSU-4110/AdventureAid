import React, { useState } from 'react';
import axios from 'axios';
import { Container, Paper, Grid, TextField, Button, Typography } from '@mui/material';

const FlightStatusComponent = () => {
  const [formData, setFormData] = useState({
    carrierCode: '',
    flightNumber: '',
    scheduledDepartureDate: ''
  });
  const [flightStatus, setFlightStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/api/flightStatus/flight-status', { params: formData });
      setFlightStatus(response.data);
    } catch (error) {
      console.error('Error fetching flight status:', error);
    }
  };

  return (
   <Container maxWidth="sm" className="flight-status-container">
      <Paper elevation={6} style={{ padding: '20px', marginTop: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Carrier Code"
                name="carrierCode"
                value={formData.carrierCode}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Flight Number"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="date"
                label="Scheduled Departure Date"
                InputLabelProps={{ shrink: true }}
                name="scheduledDepartureDate"
                value={formData.scheduledDepartureDate}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Check Flight Status
          </Button>
        </form>
      </Paper>

      {flightStatus && (
        <Paper elevation={6} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography component="h2" variant="h6">
            Flight Status:
          </Typography>
          <pre>{JSON.stringify(flightStatus, null, 2)}</pre>
        </Paper>
      )}
    </Container>
  );
};

export default FlightStatusComponent;
