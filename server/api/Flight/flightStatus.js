const express = require('express'); // 1. Add this for Express
const axios = require('axios'); // 1. Add this for making HTTP requests
const querystring = require('querystring'); // 1. Add this for formatting
require('dotenv').config(); // 1. Add this to load environment variables from .env file

const router = express.Router(); // 1. Add this for Express
const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY; // 1. Add this for Amadeus API key
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET; // 1. Add this for Amadeus API secret

// 2. Add this endpoint to retrieve flight status from Amadeus API server using the parameters received from the query string
router.get('/flight-status', async (req, res) => {
    const { carrierCode, flightNumber, scheduledDepartureDate } = req.query;

    if (!carrierCode || !flightNumber || !scheduledDepartureDate) {
        return res.status(400).send({ message: 'Required parameters: carrierCode, flightNumber, scheduledDepartureDate.' });
    }

    // Step 1: Fetch the token from Amadeus' authentication endpoint
    let token;

    // Format the data as x-www-form-urlencoded
    const authData = querystring.stringify({
        client_id: AMADEUS_API_KEY,
        client_secret: AMADEUS_API_SECRET,
        grant_type: 'client_credentials'
    });

    // Send a POST request to the Amadeus API server to retrieve the token
    try {
        const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', authData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Set the header
            }
        });
        token = tokenResponse.data.access_token;
    } catch (authError) {
        console.error(authError.response.data); // log detailed error information
        return res.status(500).send({ message: 'Failed to authenticate with Amadeus', error: authError.message });
    }

    // Step 2: Use the token to fetch flight status
    const url = `https://test.api.amadeus.com/v2/schedule/flights?carrierCode=${carrierCode}&flightNumber=${flightNumber}&scheduledDepartureDate=${scheduledDepartureDate}`;

    try { // Send a GET request to the Amadeus API server to retrieve the flight status
        const flightStatusResponse = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        res.send(flightStatusResponse.data);
    } catch (error) { // Handle errors
        if (error.response) {
            return res.status(error.response.status).send({ message: 'Error retrieving flight status', error: error.response.data });
        } else {
            return res.status(500).send({ message: 'Unknown error', error: error.message });
        }
    }
});

module.exports = router;

// test using the following URL: http://localhost:3001/api/flightStatus/flight-status?carrierCode=AA&flightNumber=2374&scheduledDepartureDate=2023-10-20