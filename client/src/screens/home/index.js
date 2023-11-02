import { Container, Grid } from '@mui/material';

import Navbar from '../../components/navbar';
import WeatherComponent from '../../components/weather';
import './index.scss';


function Home() {
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
        </Grid>
      </Container>
    </>
  );
}

export default Home;
