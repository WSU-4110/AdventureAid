import React, { useState } from 'react';
import axios from 'axios';
import "./flightDelayPrediction.scss";
import FlightOfferCard from './flightCard';
import { Container, Grid, TextField, Button, Paper, Typography } from '@mui/material';

import "./flightDelayPrediction.scss";

const FlightDelayPredictionComponent = () => {
  const [formData, setFormData] = useState({
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    aircraftCode: '',
    carrierCode: '',
    flightNumber: '',
    duration: ''
  });
  const [predictionResult, setPredictionResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/api/flightDelayPrediction', { params: formData });
      setPredictionResult(response.data);
    } catch (error) {
      console.error('Error fetching flight delay prediction:', error);
    }
  };

  return (
    <Container component="main" maxWidth="md" className="flight-delay-prediction-container">
      <Paper elevation={6} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography component="h1" variant="h5" style={{ marginBottom: '20px' }}>
          Flight Delay Prediction
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Form fields for each parameter */}
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="originLocationCode" style={{ color: 'red', marginRight: '5px' }}>
                  Origin Location Code *
                </label>
                <TextField
                  name="originLocationCode"
                  required
                  fullWidth
                  value={formData.originLocationCode}
                  onChange={handleChange}
                />
              </div>
            </Grid>
            {/* ... more inputs for other parameters ... */}
            {/* Example for another field */}
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="destinationLocationCode" style={{ color: 'red', marginRight: '5px' }}>
                  Destination Location Code *
                </label>
                <TextField
                  name="destinationLocationCode"
                  required
                  fullWidth
                  value={formData.destinationLocationCode}
                  onChange={handleChange}
                />
              </div>
            </Grid>
            {/* Add other fields similarly */}
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Predict Flight Delay
          </Button>
        </form>
      </Paper>

      {predictionResult && (
        <Paper elevation={6} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography component="h2" variant="h6">
            Prediction Result:
          </Typography>
          <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
        </Paper>
      )}   
    </Container>
  );
};

export default FlightDelayPredictionComponent;
