import logo from '../../assets/img/logo.svg';
import { Box } from '@mui/material';

import WeatherComponent from '../../components/weather';
import MapComponent from '../../components/maps/googlemaps';
import TravelAdvisoryComponent from '../../components/travel-advisory';

import './index.scss';


function Home() {
  return (
    <>
    <Box>
      <WeatherComponent />
    </Box>
     
    </>
  );
}

export default Home;
