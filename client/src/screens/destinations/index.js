import { Container, Grid } from '@mui/material';
import Navbar from '../../components/navbar';
import Map from "../../components/maps/googlemaps.js"
import SimpleSearchBar from '../../components/autocomplete/autocomplete.js';
import './index.scss';
import React, { useState } from 'react';


function Destinations() {
    // Share user place search between the SimpleSearchBar and MapComponent components for combined functionality
    const [searchInput, setSearchInput] = useState('');
    const handleSearch = (input) => {
      setSearchInput(input);
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
            <SimpleSearchBar onSearch={handleSearch}/>
            <Map searchInput={searchInput}/> 
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Destinations;
