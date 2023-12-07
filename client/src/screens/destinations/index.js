import { Box, Container, Grid } from '@mui/material';


import Navbar from '../../components/navbar';
import WeatherComponent from '../../components/weather';
import Map from "../../components/maps/googlemaps.js"
import SimpleSearchBar from '../../components/autocomplete/autocomplete.js';
import "./index.scss";
import React, { useState, useEffect } from 'react';
import MapComponent from '../../components/maps/googlemaps.js';
import { vacationOperations } from '../../components/middleware-apis/vacationOperations.js';
import Calendar from '../../components/calendar/index.js';

import HotelSearch from "../../components/Hotels/hotelList.js"
import HotelSentiments from '../../components/Hotels/hotelRating.js';
import FlightDelayPredictionComponent from '../../components/Flight/flightDelayPrediction.js';
import FlightSearchComponent from '../../components/Flight/flightSearch.js';
import FlightStatusComponent from '../../components/Flight/flightStatus.js';
import CategoryRatedAreas from '../../components/Location/categoryRatedArea.js';

function Destinations() {
    // Share user place search between the SimpleSearchBar and MapComponent components for combined functionality
    const [vacationName, setVacationName] = useState('');
    const [searchPlaceInput, setPlaceSearchInput] = useState('');
    const [searchLocationInput, setLocationSearchInput] = useState('');
    const handlePlaceSearch = (input) => {
      setPlaceSearchInput(input);
    };
    const handleLocationSearch = (input) => {
      setLocationSearchInput(input);
    };

    useEffect(() => {
      const fetchVacationName = async () => {
        try {
          const name = await vacationOperations.getName();
          setVacationName(name);
        } catch (error) {
          console.error('Error fetching vacation name:', error);
        }
      };

      fetchVacationName();
    }, []);

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
        </Grid>
        <Grid container
          direction="row"
        >
          <Grid className="planning-filter-container" item xs={6}> {/* Left side for UI */}
            <h1><center>{vacationName}</center></h1>
            <Calendar />
            <SimpleSearchBar onPlaceSearch={handlePlaceSearch} onLocationSearch={handleLocationSearch} />
          </Grid>
          <Grid item xs={6}> {/* Right side for map */}
            <MapComponent searchPlaceInput={searchPlaceInput} searchLocationInput={searchLocationInput} />
          </Grid>
        </Grid>

    <HotelSearch />
    <HotelSentiments />
    <FlightDelayPredictionComponent />
    <FlightSearchComponent />
    <FlightStatusComponent />
    <CategoryRatedAreas />
      </Container>
    </>
  );
}

export default Destinations;
