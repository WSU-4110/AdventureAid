import { Container, Grid } from '@mui/material';
import Navbar from '../../components/navbar';
import Map from "../../components/maps/googlemaps.js"
import PlacesAutocomplete from '../../components/autocomplete/autocomplete.js';
import './index.scss';
import React, { useState } from 'react';


function Destinations() {
  //share user place search between the PlacesAutocomplete and Map components for combined functionality
  const [searchInput, setSearchInput] = useState('');
  const handlePlaceSelected = (place) => {
    setSearchInput(place);
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
            <PlacesAutocomplete onPlaceSelected={handlePlaceSelected}/>
            <Map searchInput={searchInput}/> 
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Destinations;
