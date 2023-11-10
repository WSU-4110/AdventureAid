import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import './index.scss';

function TravelAdvisoryComponent() {
  const [advisoryData, setAdvisoryData] = useState(null);
  const [countryCode, setCountryCode] = useState(''); // Default country code is empty
  const [isLoading, setIsLoading] = useState(false); // Add a loading state

  useEffect(() => {
    if (!countryCode) {
      setAdvisoryData(null); // Reset advisory data when country code is cleared
      return; // Do not fetch data if no country code
    }

    setIsLoading(true); // Start loading when fetch starts
    const apiUrl = `https://www.travel-advisory.info/api?countrycode=${countryCode}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.data && data.data[countryCode]) {
          setAdvisoryData(data.data[countryCode].advisory); // Adjusting based on the response structure
        }
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      })
      .finally(() => {
        setIsLoading(false); // End loading when fetch is complete or has failed
      });
  }, [countryCode]); // This useEffect runs when the countryCode state changes

  return (
    <Box className="travel-advisory-container">
      <input
        className="searchbar"
        type="text"
        value={countryCode}
        onChange={e => setCountryCode(e.target.value.toUpperCase())} // Ensure country code is uppercase
        placeholder="Enter country code"
      />
      {isLoading ? (
        <Box className="travel-advisory-text-container">
          <Typography className='text'>Loading advisory data...</Typography>
        </Box>
      ) : advisoryData ? (
        <Box className="travel-advisory-text-container">
          <Typography className='text'>Country: {countryCode}</Typography>
          <Typography className='text'>Advisory Score: {advisoryData.score}</Typography>
          <Typography className='text'>Message: {advisoryData.message}</Typography>
        </Box>
      ) : (
        countryCode && 
        <Box className="travel-advisory-text-container">
          <Typography className='text'>No advisory data available.</Typography>
        </Box>
      )}
    </Box>
  );
}

export default TravelAdvisoryComponent;
