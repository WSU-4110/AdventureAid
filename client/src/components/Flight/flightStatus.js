import React, { useState } from 'react'; // import useState
import axios from 'axios'; // import axios
import { Container, Paper, Grid, TextField, Button, Typography } from '@mui/material'; // import the Material UI components

const FlightStatusComponent = () => { // define the FlightStatusComponent functional component
  const [formData, setFormData] = useState({
    carrierCode: '',
    flightNumber: '',
    scheduledDepartureDate: ''
  });
  // const [formData, setFormData] = useState({}); // initialize the formData state variable
  const [flightStatus, setFlightStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // const handleChange = (e) => { // define the handleChange function to update the formData state variable when the user types in the form fields
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/api/flightStatus/flight-status', { params: formData });
      setFlightStatus(formatFlightData(response.data));
    } catch (error) {
      console.error('Error fetching flight status:', error);
    }
  };

  // const handleSubmit = async (e) => { // define the handleSubmit function to send the form data to the server when the user clicks the Check Flight Status button
  const formatFlightData = (data) => {
    if (!data || !data.data) return null;
    return data.data.map(flight => ({
      date: flight.scheduledDepartureDate,
      carrierCode: flight.flightDesignator.carrierCode,
      flightNumber: flight.flightDesignator.flightNumber,
      departure: flight.flightPoints[0].iataCode,
      scheduledDepartureTime: flight.flightPoints[0].departure.timings.find(timing => timing.qualifier === 'STD').value,
    }));
  };

  return ( // return the FlightStatusComponent JSX code to render the form fields and the flight status
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
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Flight Number"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                fullWidth
                required
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
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Check Flight Status
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {flightStatus && flightStatus.map((flight, index) => (
        <Paper key={index} elevation={6} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography component="h2" variant="h6">
            Flight Status:
          </Typography>
          <div>
            <p>Date: {flight.date}</p>
            <p>Carrier Code: {flight.carrierCode}</p>
            <p>Flight Number: {flight.flightNumber}</p>
            <p>Departure Airport: {flight.departure}</p>
            <p>Scheduled Departure Time: {flight.scheduledDepartureTime}</p>
          </div>
        </Paper>
      ))}
    </Container>
  );
};
export default FlightStatusComponent; // export the FlightStatusComponent functional component for use in other components
