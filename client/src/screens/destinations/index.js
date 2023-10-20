import { Box, Typography } from '@mui/material';

import Map from "../../components/maps/googlemaps.js"

import './index.scss';


function Destinations() {
  return (
    <>
      <Box>
        <Typography variant="h1" fontSize={{ xs: "3rem", md: "5rem" }} textAlign="center">
          Destinations
        </Typography>
        <Map />
      </Box>

    </>
  );
}

export default Destinations;
