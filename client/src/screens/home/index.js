import React, { useState } from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';

import Navbar from '../../components/navbar';
import { vacationOperations } from '../../components/middleware-apis/vacationOperations';
import TravelAdvisor from '../../components/travel-advisory';
import Calendar from '../../components/calendar';
import "./index.scss";

/*function Home() {
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
            
            <Calendar />
          </>
        )}
      </Container>
    </>
  );
}
*/

function Home() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [locality, setLocality] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStartPlanningClick = () => {
    setShowCalendar(true); // This will now control the display of both Calendar and TravelAdvisor
  };

  const handleCreateVacation = (event) => {
    event.preventDefault();

    setErrorMessage('');  //reset error message

    //create Date objects from the input strings
    const start = new Date(startDate);
    const end = new Date(endDate);
    //check if the end date is before the start date
    if (start > end) {
      setErrorMessage('End date cannot be before start date.');
      return;
    }

    vacationOperations.planVacation(locality, startDate, endDate);
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
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form id='start-planning-form' onSubmit={handleCreateVacation}>
              <label id='start-planning-label'>
                Where to?
                <input 
                  id='start-planning-location-input'
                  type="text" 
                  placeholder="e.g. Paris, Hawaii, Japan" 
                  value={locality} 
                  onChange={(e) => setLocality(e.target.value)} 
                />
              </label>
              <div>
                <label>
                  Start date
                  <input id='start-planning-input-date'
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                  />
                </label>
                <label>
                  End date
                  <input id='start-planning-input-date'
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                  />
                </label>
              </div>
              <button id='start-planning-button' type="submit">
                Start planning
              </button>
            </form>
          </>
        )}
      </Container>
    </>
  );
}

export default Home;
