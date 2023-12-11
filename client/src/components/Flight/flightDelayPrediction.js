import React, { useState } from 'react'; // import useState
import axios from 'axios'; // import axios
import "./flightDelayPrediction.scss"; // import the stylesheet
import FlightOfferCard from './flightCard'; // import the FlightOfferCard component
import { Container, Grid, TextField, Button, Paper, Typography } from '@mui/material'; // import the Material UI components

import "./flightDelayPrediction.scss"; // import the stylesheet

// import the FlightOfferCard component
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
  // const [formData, setFormData] = useState({}); // initialize the formData state variable
  const [predictionResult, setPredictionResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // const handleChange = (e) => { // define the handleChange function to update the formData state variable when the user types in the form fields 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/api/flightDelayPrediction', { params: formData });
      setPredictionResult(response.data);
    } catch (error) {
      console.error('Error fetching flight delay prediction:', error);
    }
  };

  // const handleSubmit = async (e) => { // define the handleSubmit function to send the form data to the server when the user clicks the Predict Flight Delay button
  return ( // return the FlightDelayPredictionComponent JSX code to render the form fields and the prediction result  
    <Container component="main" maxWidth="md" className="flight-delay-prediction-container">
      <Paper elevation={6} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography component="h1" variant="h5" style={{ marginBottom: '20px' }}>
          Flight Delay Prediction
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Form fields for each parameter */}
            {/* Example for originLocationCode */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Origin Location Code"
                name="originLocationCode"
                required
                fullWidth
                value={formData.originLocationCode}
                onChange={handleChange}
              />
            </Grid>
            {/* Example for destinationLocationCode */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Destination Location Code"
                name="destinationLocationCode"
                required
                fullWidth
                value={formData.destinationLocationCode}
                onChange={handleChange}
              />
            </Grid>
            {/* Other fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Departure Date"
                name="departureDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                value={formData.departureDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Departure Time"
                name="departureTime"
                type="time"
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                value={formData.departureTime}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Arrival Date"
                name="arrivalDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                value={formData.arrivalDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Arrival Time"
                name="arrivalTime"
                type="time"
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                value={formData.arrivalTime}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Aircraft Code"
                name="aircraftCode"
                required
                fullWidth
                value={formData.aircraftCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Carrier Code"
                name="carrierCode"
                required
                fullWidth
                value={formData.carrierCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Flight Number"
                name="flightNumber"
                required
                fullWidth
                value={formData.flightNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration"
                name="duration"
                required
                fullWidth
                value={formData.duration}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Predict Flight Delay
              </Button>
            </Grid>
          </Grid>
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
// export the FlightDelayPredictionComponent

export default FlightDelayPredictionComponent;
