import React from 'react';
import { Paper, Typography, Divider } from '@mui/material';

const FlightOfferCard = ({ flightOffer }) => {
  return (
    <Paper elevation={3} className="flight-offer-card">
      <Typography variant="h6">Flight Offer</Typography>
      <Divider />
      <Typography variant="subtitle1">Flight Details</Typography>
      <ul>
        <li>Departure: {flightOffer.departure.iataCode} at {flightOffer.departure.at}</li>
        <li>Arrival: {flightOffer.arrival.iataCode} at {flightOffer.arrival.at}</li>
        <li>Duration: {flightOffer.duration}</li>
        {/* Other details */}
      </ul>
      <Typography variant="subtitle1">Pricing</Typography>
      <p>Total Price: {flightOffer.price.total} {flightOffer.price.currency}</p>
      {/* Other pricing details */}
    </Paper>
  );
};

export default FlightOfferCard;
