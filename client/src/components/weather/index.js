import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import SearchBar from '../searchbar/index.js';
import SearchIcon from '@mui/icons-material/Search';
import './index.scss';

function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    if (!search) return;

    setError('');
    setWeatherData(null);
    setIsLoading(true); // Set loading to true when fetch starts

    fetch(`http://localhost:3001/api/weather/${search}`)
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('City not found');
          }
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
      })    
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when fetch completes
      });
  }, [search]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    setSearch(city);
  };


  return (
    <Box className="card">
      <Box className="search-container">
        <SearchBar 
          onChange={handleInputChange} 
          value={city} 
          label={'Enter City:'}
          />
        <SearchIcon className="search-icon" onClick={handleSearch} />
      </Box>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : isLoading ? (
        <Typography>Loading weather data...</Typography> // Render loading message if isLoading is true
      ) : weatherData ? (
            <Box>
              <Typography>City: {weatherData.city}</Typography>
              <Typography>Temperature: {Math.round(weatherData.temperature)}°F</Typography>
              <Typography>Humidity: {weatherData.weather}</Typography>
            </Box>
      ) : null}
    </Box>
  );
}

export default WeatherComponent;
