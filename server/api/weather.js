require('dotenv').config(); // Load environment variables from the .env file
const express = require('express'); // import express from 'express';
const axios = require('axios'); // import axios from 'axios';

const app = express(); // Create an instance of an Express app (server) 

const API_KEY = process.env.OPEN_WEATHER_API_KEY;  // Assumes the key is stored in environment variables

app.get('/weather/:city', async (req, res) => { // GET /weather/:city 
    let url; // Declare a variable to hold the URL
    const { city, cityId, lat, lon, zipCode } = req.params; // Extract the city name from the request parameters
    if (city) { // If the city name is provided, use it to build the URL
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
    } else if (cityId) { // If the city ID is provided, use it to build the URL
        url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=imperial`;
    } else if (lat && lon) { // If the latitude and longitude are provided, use them to build the URL
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    } else if (zipCode) { // If the zip code is provided, use it to build the URL
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_KEY}&units=imperial`;
    } else { // If no location information is provided, send an error message back to the client
        res.status(400).send({ message: 'No location information provided' });
    }

    try { // Try to make the API call 
        const response = await axios.get(url); // Wait for the response 
        const data = response.data; // Extract the data from the response 
        res.send({ // Send the data back to the client
            city: data.name, // Extract the city name
            temperature: data.main.temp, // Extract the temperature
            weather: data.weather[0].description // Extract the weather description
        });
    } catch (error) { // Catch any errors
        if (error.response) { // If the error has a response property, it's a request error 
            res.status(error.response.status).send({ message: 'Error retrieving weather data', error: error.response.data }); // Send the error response back to the client 
        } else { // Otherwise, it's an error with the server/service 
            res.status(500).send({ message: 'Unknown error', error: error.message }); // Send a generic 500 status with the error message 
        }
    }
    
});



app.listen(3000, () => console.log('Server started on port 3000')); // Start the server on port 3000 and log a message to the console when it starts

