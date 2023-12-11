const express = require('express'); // Express web server framework
const axios = require('axios'); // Axios HTTP client
const querystring = require('querystring'); // Node query string module
require('dotenv').config(); // Dotenv module to load environment variables from .env file

const router = express.Router(); // Express router
const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY; // Amadeus API key
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET; // Amadeus API secret

// Function to retrieve the Amadeus API token from the Amadeus API server using the API key and secret
async function getAmadeusToken() {
    // Construct the request body with the API key, secret and grant type
    const authData = querystring.stringify({
        client_id: AMADEUS_API_KEY,
        client_secret: AMADEUS_API_SECRET,
        grant_type: 'client_credentials'
    });

    // Send a POST request to the Amadeus API server to retrieve the token
    try {
        const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', authData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return tokenResponse.data.access_token;
    } catch (error) {
        console.error("Error fetching Amadeus token:", error);
        throw error;
    }
}

// Endpoint to retrieve flight delay prediction from Amadeus API server using the parameters received from the query string 
router.get('/', async (req, res) => {
    const {
        originLocationCode, destinationLocationCode, departureDate, departureTime,
        arrivalDate, arrivalTime, aircraftCode, carrierCode, flightNumber, duration
    } = req.query;

    // Validate required parameters
    if (!originLocationCode || !destinationLocationCode || !departureDate || !departureTime || 
        !arrivalDate || !arrivalTime || !aircraftCode || !carrierCode || !flightNumber || !duration) {
        return res.status(400).send({ message: 'Required parameters are missing.' });
    }

    // Retrieve the Amadeus API token from the Amadeus API server using the API key and secret 
    let token;
    try {
        token = await getAmadeusToken();
    } catch (error) {
        return res.status(500).send({ message: 'Failed to authenticate with Amadeus', error: error.message });
    }
    
    // Construct the request URL with the parameters received from the query string
    const url = `https://test.api.amadeus.com/v1/travel/predictions/flight-delay?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&departureTime=${encodeURIComponent(departureTime)}&arrivalDate=${arrivalDate}&arrivalTime=${encodeURIComponent(arrivalTime)}&aircraftCode=${aircraftCode}&carrierCode=${carrierCode}&flightNumber=${flightNumber}&duration=${duration}`;

    // Send a GET request to the Amadeus API server to retrieve the flight delay prediction
    try {
        const flightDelayPredictionResponse = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        res.send(flightDelayPredictionResponse.data);
    } catch (error) { // Handle errors
        if (error.response) {
            return res.status(error.response.status).send({ message: 'Error retrieving flight delay prediction', error: error.response.data });
        } else {
            return res.status(500).send({ message: 'Unknown error', error: error.message });
        }
    }
});


// To test this endpoint, construct a query with the required parameters

module.exports = router;

// link to test: http://localhost:3001/api/flightDelayPrediction?originLocationCode=NCE&destinationLocationCode=IST&departureDate=2020-08-01&departureTime=18%3A20%3A00&arrivalDate=2020-08-01&arrivalTime=22%3A15%3A00&aircraftCode=321&carrierCode=TK&flightNumber=1816&duration=PT31H10M
