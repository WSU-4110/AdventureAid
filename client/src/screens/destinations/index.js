import { Box, Container, Grid } from '@mui/material'; // import the Material UI components


import Navbar from '../../components/navbar'; // import the Navbar component
import WeatherComponent from '../../components/weather'; // import the WeatherComponent component
import Map from "../../components/maps/googlemaps.js" // import the Map component
import SimpleSearchBar from '../../components/autocomplete/autocomplete.js'; // import the SimpleSearchBar component
import "./index.scss"; // import the stylesheet
import React, { useState, useEffect } from 'react'; // import useState and useEffect
import MapComponent from '../../components/maps/googlemaps.js'; // import the MapComponent component
import { vacationOperations } from '../../components/middleware-apis/vacationOperations.js'; // import the vacationOperations module
import Calendar from '../../components/calendar/index.js'; // import the Calendar component

import HotelSearch from "../../components/Hotels/hotelList.js" // import the HotelSearch component
import HotelSentiments from '../../components/Hotels/hotelRating.js'; // import the HotelSentiments component
import FlightDelayPredictionComponent from '../../components/Flight/flightDelayPrediction.js'; // import the FlightDelayPredictionComponent component
import FlightSearchComponent from '../../components/Flight/flightSearch.js'; // import the FlightSearchComponent component
import FlightStatusComponent from '../../components/Flight/flightStatus.js'; // import the FlightStatusComponent component
import CategoryRatedAreas from '../../components/Location/categoryRatedArea.js'; // import the CategoryRatedAreas component

function Destinations() { // define the Destinations functional component
    // Share user place search between the SimpleSearchBar and MapComponent components for combined functionality
    const [vacationName, setVacationName] = useState('');
    const [searchPlaceInput, setPlaceSearchInput] = useState('');
    const [searchLocationInput, setLocationSearchInput] = useState('');
    const handlePlaceSearch = (input) => {
      setPlaceSearchInput(input);
    }; 
    // const [searchPlaceInput, setPlaceSearchInput] = useState(''); // initialize the searchPlaceInput state variable
    const handleLocationSearch = (input) => {
      setLocationSearchInput(input);
    };
    // const [searchLocationInput, setLocationSearchInput] = useState(''); // initialize the searchLocationInput state variable
    const [topAttractions, setTopAttractions] = useState([]); // State to store attractions

    const handleAttractionsUpdate = (attractions) => {
        setTopAttractions(attractions);
    };

    useEffect(() => { // define the useEffect hook to fetch the vacation name and places name when the component loads
      const fetchVacationName = async () => {
        try {
          const name = await vacationOperations.getName();
          console.log('display',name);
          setVacationName(name);
        } catch (error) {
          console.log(error);
        }
      }
      const fetchPlacesName = async () => { // define the fetchPlacesName function to fetch the places name
        try {
          console.log(vacationName,'>>>>>>>>>>>>>>>>>>>')

          const name = await vacationOperations.getPlace('jaipur');// need to add dynamic city
          console.log('display2',name);
          
        } catch (error) {
          console.error('Error fetching vacation name:', error);
        }
      }; 

      fetchVacationName(); // call the fetchVacationName function
      fetchPlacesName(); // call the fetchPlacesName function
    }, []);

  return ( // return the Destinations JSX code to render the UI
    <>
      <Container maxWidth={false} className='container'>
        <Grid container
          direction="column"
          spacing={4}
        >
          <Grid item my="1rem">
            <Navbar />
          </Grid>
        </Grid>
        <WeatherComponent />
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
