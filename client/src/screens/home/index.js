import { Box } from '@mui/material';

import WeatherComponent from '../../components/weather';
import './index.scss';
import MapComponent from '../../components/maps/googlemaps';


function Home() {
  return (
    <>
    <Box>
      <WeatherComponent />
      <MapComponent />
    </Box>
     
    </>
  );
}

export default Home;
