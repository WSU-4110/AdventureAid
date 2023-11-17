import { Typography, Grid, Container } from '@mui/material';
import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { vacationOperations } from '../../components/middleware-apis/vacationOperations';
import './index.scss';


function About() {
  const [destinationInput, setDestinationInput] = useState('');

  const handleAddDestination = () => {
    vacationOperations.addDestination(destinationInput).then(() => {
      // Optionally reset the input or perform other actions on success
      setDestinationInput('');
    });
  }

  const handleRemoveDestination = () => {
    vacationOperations.removeDestination(destinationInput).then(() => {
      // Optionally reset the input or perform other actions on success
      setDestinationInput('');
    });
  }

  const handleRemoveAllDestinations = () => {
    vacationOperations.removeAllDestinations().then(() => {
      setDestinationInput('');
    });
  }

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
            <Typography variant="h1" fontSize={{ xs: "3rem", md: "5rem" }} textAlign="center">
            <input 
                type="text" 
                value={destinationInput} 
                onChange={(e) => setDestinationInput(e.target.value)} 
            />
            <button onClick={handleAddDestination}>Add Destination</button>
            <input 
                type="text" 
                value={destinationInput} 
                onChange={(e) => setDestinationInput(e.target.value)} 
            />
            <button onClick={handleRemoveDestination}>Remove Destination</button>
            <button onClick={handleRemoveAllDestinations}> Remove All Destinations</button>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default About;
