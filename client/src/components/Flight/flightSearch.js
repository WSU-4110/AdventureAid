import React, { useState } from 'react';
import axios from 'axios';
import { Container, Paper, Grid, TextField, Button, Typography, Switch, FormControlLabel } from '@mui/material';
import './flightSearch.scss';

const FlightSearchComponent = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    adults: '',
    returnDate: '',
    children: '',
    infants: '',
    travelClass: '',
    includedAirlineCodes: '',
    excludedAirlineCodes: '',
    nonStop: false,
    currencyCode: '',
    maxPrice: '',
    max: ''
  });
  const [flightOffers, setFlightOffers] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/api/flightSearch/flight-offers', { params: formData });
      setFlightOffers(response.data);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    }
  };

  return (
    <Container component="main" maxWidth="md" className="flight-search-container">
      <Paper elevation={6}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Form fields for each parameter */}
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="origin" style={{ color: 'red', marginRight: '5px' }}>
                  Origin *
                </label>
                <TextField label="Origin" name="origin" value={formData.origin} onChange={handleChange} fullWidth required />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="destination" style={{ color: 'red', marginRight: '5px' }}>
                  Destination *
                </label>
                <TextField label="Destination" name="destination" value={formData.destination} onChange={handleChange} fullWidth required />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="departureDate" style={{ color: 'red', marginRight: '5px' }}>
                  Departure Date *
                </label>
                <TextField
                  type="date"
                  label="Departure Date"
                  InputLabelProps={{ shrink: true }}
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Return Date" name="returnDate" value={formData.returnDate} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField type="number" label="Adults" name="adults" value={formData.adults} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField type="number" label="Children" name="children" value={formData.children} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField type="number" label="Infants" name="infants" value={formData.infants} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField label="Travel Class" name="travelClass" value={formData.travelClass} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Included Airline Codes" name="includedAirlineCodes" value={formData.includedAirlineCodes} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Excluded Airline Codes" name="excludedAirlineCodes" value={formData.excludedAirlineCodes} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Currency Code" name="currencyCode" value={formData.currencyCode} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField type="number" label="Max Price" name="maxPrice" value={formData.maxPrice} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField type="number" label="Max" name="max" value={formData.max} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch checked={formData.nonStop} onChange={handleChange} name="nonStop" />}
                label="Non-stop Flights Only"
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Search Flights
          </Button>
        </form>
      </Paper>

      {flightOffers && (
        <Paper elevation={6} className="flight-offers">
          <Typography component="h2" variant="h6">
            Flight Offers:
          </Typography>
          <pre>{JSON.stringify(flightOffers, null, 2)}</pre>
        </Paper>
      )}
    </Container>
  );
};

export default FlightSearchComponent;

