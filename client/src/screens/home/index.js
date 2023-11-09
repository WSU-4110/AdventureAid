import React, { useState } from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';

import Navbar from '../../components/navbar';
import TravelAdvisor from '../../components/travel-advisory';
import Calendar from '../../components/calendar';
import "./index.scss";

function Home() {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleStartPlanningClick = () => {
    setShowCalendar(true); // This will now control the display of both Calendar and TravelAdvisor
  };

  return (
    <>
      <Container maxWidth={false} className='home-container'>
        <Grid container
          direction="column"
          spacing={4}
        >
          <Grid item mt="1rem">
            <Navbar />
          </Grid>
          <Grid item>
            <Box>
              <Typography variant="body1" className="hero-text">
                Your Next Adventure Awaits
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {!showCalendar && (
          <Button className="button" onClick={handleStartPlanningClick}>
            <Typography sx={{ fontWeight: "bold", color: "black" }}>
              Start Planning
            </Typography>
          </Button>
        )}
        {showCalendar && (
          <>
            <TravelAdvisor />
            <Calendar />
          </>
        )}
      </Container>
    </>
  );
}

export default Home;
