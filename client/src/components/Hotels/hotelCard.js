import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function HotelCard({ hotel }) {
  return (
    <Card style={{ marginBottom: 20 }}>
      <CardContent>
        <Typography variant="h5">{hotel.name}</Typography>
        <Typography variant="subtitle1">Chain Code: {hotel.chainCode}</Typography>
        <Typography variant="subtitle2">Hotel ID: {hotel.hotelId}</Typography>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Latitude: {hotel.geoCode.latitude}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Longitude: {hotel.geoCode.longitude}</Typography>
          </Grid>
        </Grid>
        <Typography>Country: {hotel.address.countryCode}</Typography>
        <Typography>Distance: {hotel.distance.value} {hotel.distance.unit}</Typography>
        <Typography>Last Update: {hotel.lastUpdate}</Typography>
      </CardContent>
    </Card>
  );
}

export default HotelCard;
