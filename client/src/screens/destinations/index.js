import { Container, Grid } from '@mui/material';


import Navbar from '../../components/navbar';
import WeatherComponent from '../../components/weather';
import Map from "../../components/maps/googlemaps.js"

import "./index.scss";


function Destinations() {
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
            <Map />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Destinations;
