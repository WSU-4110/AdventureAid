import { Box, Typography } from '@mui/material';

import './index.scss';


function About() {
  return (
    <>
      <Box>
        <Typography variant="h1" fontSize={{ xs: "3rem", md: "5rem" }} textAlign="center">
          About
        </Typography>
      </Box>

    </>
  );
}

export default About;
