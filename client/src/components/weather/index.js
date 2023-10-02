import React, { useEffect, useState } from 'react';

function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/weather/Seattle')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data); // Set the data in state
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []); // The empty dependency array means this useEffect runs once when the component mounts

  return (
    <div>
      {weatherData ? (
        <div>
          {/* Render your weather data here */}
          <p>City: {weatherData.city}</p>
          <p>Temperature: {weatherData.temperature}°F</p>
          <p>Weather: {weatherData.weather}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherComponent;
