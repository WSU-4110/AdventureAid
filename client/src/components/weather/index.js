import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
//import { googleMapsOperations } from '../maps/googlemapsAPI.js';

import SearchBar from '../searchbar/index.js';
import SearchIcon from '@mui/icons-material/Search';
import WaterIcon from '@mui/icons-material/Water';
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';

import clearSky from "../../assets/img/weather-icons/clear-sky.png"
import clouds from "../../assets/img/weather-icons/clouds.png"
import fewClouds from "../../assets/img/weather-icons/few-clouds.png"
import rain from "../../assets/img/weather-icons/rain.png"
import scatteredClouds from "../../assets/img/weather-icons/scattered-clouds.png"
import snow from "../../assets/img/weather-icons/snow.png"
import thunderstorm from "../../assets/img/weather-icons/thunderstorm.png"

import './index.scss';

function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [weatherImage, setWeatherImage] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [temperatureUnit, setTemperatureUnit] = useState('F'); // Default to Fahrenheit

  useEffect(() => {
    if (!search) return;
    //googleMapsOperations.displayGoogleMaps();
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
        setWeatherImage(getWeatherImage(data.weather)); // Set the weather image URL
      })    
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when fetch completes
      });
  }, [search]);

  // Function to map weather description to image URL
  const getWeatherImage = (weatherDescription) => {
    const weatherImages = {
      'clear sky': clearSky,
      'few clouds': fewClouds,
      'scattered clouds': scatteredClouds,
      'broken clouds': clouds,
      'overcast clouds': clouds,
      'shower rain': rain,
      'rain': rain,
      'thunderstorm': thunderstorm,
      'snow': snow,
      'mist': clouds,
    };
    return weatherImages[weatherDescription.toLowerCase()] || '../../assets/img/weather-icons/clouds.jpeg';
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    setSearch(city);
    //googleMapsOperations.searchLocation(city);
  };

  const handleTemperatureUnitChange = () => {
    // switch between Celsius and Fahrenheit
    setTemperatureUnit(temperatureUnit === 'C' ? 'F' : 'C');
  };

  const convertTemperature = (temperature) => {
    // convert temperature 
    if (temperatureUnit === 'C') {
      return Math.round((temperature - 32) * (5 / 9)) + '°C';
    } else {
      return Math.round(temperature) + '°F';
    }
  };
  
  return (
    <Box className="card">
      <Box className="search-container">
        <SearchBar 
          onChange={handleInputChange} 
          value={city} 
          label={"Enter City:"}
        />
        <SearchIcon className="search-icon" onClick={handleSearch} />
      </Box>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : isLoading ? (
        <Typography>Loading weather data...</Typography> // Render loading message if isLoading is true
      ) : weatherData ? (
            <Box className="weather-display">
              <Box className="left-column">
                <img src={weatherImage} alt={weatherData.weather} />
                <Box className="icon-row">
                  <ThermostatIcon className="icon" />
                  <Typography variant="h2" className="temp">
                  {convertTemperature(weatherData.temperature)}
                  </Typography>
                </Box>
                <Typography variant="h2" display={{ xs: "none", sm: "block" }}>{weatherData.city}</Typography>
              </Box>
              <Box className="right-column">
                <Box className="icon-row">
                  <WaterIcon className="icon" />
                  <Typography variant="h2">
                    Humidity: {weatherData.humidity}%
                  </Typography>
                </Box>
                <Box className="icon-row">
                  <AirIcon className="icon" />
                  <Typography variant="h2">
                    Wind: {Math.round(weatherData.wind)} mph
                  </Typography>
                </Box>
              </Box>
            </Box>
      ) : null}

      {/* Button to switch between Celsius and Fahrenheit */}
      <Button onClick={handleTemperatureUnitChange}> 
        {temperatureUnit === 'C' ? 'Fahrenheit' : 'Celsius'}
      </Button>
    </Box>
  );
}

export default WeatherComponent;
