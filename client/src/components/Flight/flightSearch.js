import React, { useState } from 'react'; // import useState
import axios from 'axios'; // import axios
import { Container, Paper, Grid, TextField, Button, Typography, Switch, FormControlLabel, Divider } from '@mui/material'; // import the Material UI components
import './flightSearch.scss'; // import the stylesheet

// import the stylesheet 
const FlightSearchComponent = () => { // define the FlightSearchComponent functional component
  const [formData, setFormData] = useState({
    // initialize the formData state variable
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
  // const [formData, setFormData] = useState({}); // initialize the formData state variable
  const [flightOffers, setFlightOffers] = useState(null);
  // const [flightOffers, setFlightOffers] = useState(null); // initialize the flightOffers state variable
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // const handleChange = (e) => { // define the handleChange function to update the formData state variable when the user types in the form fields
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/api/flightSearch/flight-offers', { params: formData });
      setFlightOffers(response.data);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    }
  };

  // const handleSubmit = async (e) => { // define the handleSubmit function to send the form data to the server when the user clicks the Search Flights button
  const renderFlightOffer = (offer, index) => {
    return (
      <React.Fragment key={offer.id}>
        <div className="flight-offer">
          <Typography variant="subtitle1">Flight ID: {offer.id}</Typography>
          <Typography variant="body1">Departure: {offer.itineraries[0].segments[0].departure.iataCode} at {offer.itineraries[0].segments[0].departure.at}</Typography>
          <Typography variant="body1">Arrival: {offer.itineraries[0].segments[0].arrival.iataCode} at {offer.itineraries[0].segments[0].arrival.at}</Typography>
          <Typography variant="body1">Carrier: {offer.itineraries[0].segments[0].carrierCode} Flight Number: {offer.itineraries[0].segments[0].number}</Typography>
          <Typography variant="body1">Aircraft: {offer.itineraries[0].segments[0].aircraft.code}</Typography>
          <Typography variant="body1">Duration: {offer.itineraries[0].segments[0].duration}</Typography>
        </div>
        {index !== flightOffers.data.length - 1 && <Divider style={{ margin: '20px 0' }} />}
      </React.Fragment>
    );
  };

  // const renderFlightOffer = (offer, index) => { // define the renderFlightOffer function to render the flight offer details
  return ( // return the FlightSearchComponent JSX code to render the form fields and the flight offers
    <Container component="main" maxWidth="md" className="flight-search-container">
      <Paper elevation={6}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Return Date"
                InputLabelProps={{ shrink: true }}
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="number"
                label="Adults"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="number"
                label="Children"
                name="children"
                value={formData.children}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="number"
                label="Infants"
                name="infants"
                value={formData.infants}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Travel Class"
                name="travelClass"
                value={formData.travelClass}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Included Airline Codes"
                name="includedAirlineCodes"
                value={formData.includedAirlineCodes}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Excluded Airline Codes"
                name="excludedAirlineCodes"
                value={formData.excludedAirlineCodes}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Currency Code"
                name="currencyCode"
                value={formData.currencyCode}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="number"
                label="Max Price"
                name="maxPrice"
                value={formData.maxPrice}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="number"
                label="Max"
                name="max"
                value={formData.max}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch checked={formData.nonStop} onChange={handleChange} name="nonStop" />}
                label="Non-stop Flights Only"
              />
            </Grid>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Search Flights
            </Button>
          </Grid>
        </form>
      </Paper>
      
      {flightOffers && (
        <Paper elevation={6} className="flight-offers">
          <Typography component="h2" variant="h6">
            Flight Offers:
          </Typography>
          {flightOffers.data.slice(0, 10).map((offer, index) => renderFlightOffer(offer, index))}
        </Paper>
      )}
    </Container>
  );
};
// return the FlightSearchComponent JSX code to render the form fields and the flight offers
export default FlightSearchComponent;
