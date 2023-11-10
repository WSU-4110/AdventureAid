import { Container, Grid } from '@mui/material';


import Navbar from '../../components/navbar';
import WeatherComponent from '../../components/weather';
import Map from "../../components/maps/googlemaps.js"
import SimpleSearchBar from '../../components/autocomplete/autocomplete.js';
import "./index.scss";
import React, { useState } from 'react';
import MapComponent from '../../components/maps/googlemaps.js';


function Destinations() {
    // Share user place search between the SimpleSearchBar and MapComponent components for combined functionality
    const [searchPlaceInput, setPlaceSearchInput] = useState('');
    const [searchLocationInput, setLocationSearchInput] = useState('');
    const handlePlaceSearch = (input) => {
      setPlaceSearchInput(input);
    };
    const handleLocationSearch = (input) => {
      setLocationSearchInput(input);
    };

  return (
    <>
      <Container maxWidth={false} className='container'>
        <Grid container
          direction="column"
          spacing={4}
        >
          <Grid item mt="1rem">
            <Navbar />
          </Grid>
          <Grid item>
            <WeatherComponent />
          </Grid>
          <Grid item>
            <SimpleSearchBar onPlaceSearch={handlePlaceSearch} onLocationSearch={handleLocationSearch} />
            <MapComponent searchPlaceInput={searchPlaceInput} searchLocationInput={searchLocationInput} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Destinations;
