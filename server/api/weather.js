const express = require('express'); // Import express
const axios = require('axios'); // Import axios for making HTTP requests
require('dotenv').config(); // Import dotenv for accessing environment variables

const router = express.Router(); // Create a router for your weather endpoints
const API_KEY = process.env.OPEN_WEATHER_API_KEY; // Get the API key from the environment variables

router.get('/:city', async (req, res) => { // Define a route for GET /api/weather/:city 
    let url; // Declare a variable to hold the URL
    const { city } = req.params; // Extract the city name from the request parameters
    const { cityId, lat, lon, zipCode } = req.query; // Using query parameters for additional data

    if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
    } else if (cityId) {
        url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=imperial`;
    } else if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    } else if (zipCode) {
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_KEY}&units=imperial`;
    } else {
        return res.status(400).send({ message: 'No location information provided' });
    }

    try {
        const response = await axios.get(url); // Wait for the response 
        const data = response.data; // Extract the data from the response 
        res.send({
            city: data.name, // Extract the city name
            temperature: data.main.temp, // Extract the temperature
            weather: data.weather[0].description // Extract the weather description
        });
    } catch (error) {
        if (error.response) { // If the error has a response property, it's a request error 
            return res.status(error.response.status).send({ message: 'Error retrieving weather data', error: error.response.data });
        } else { // Otherwise, it's an error with the server/service 
            return res.status(500).send({ message: 'Unknown error', error: error.message });
        }
    }
    
});


module.exports = router; // Export the router
