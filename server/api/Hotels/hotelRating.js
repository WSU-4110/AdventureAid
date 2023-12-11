const express = require('express'); // Express web server framework
const axios = require('axios'); // Axios HTTP client
const querystring = require('querystring'); // Node query string module
require('dotenv').config(); // Dotenv module to load environment variables from .env file

const router = express.Router(); // Express router

// Function to retrieve the Amadeus API token, similar to your hotelList API
async function getAmadeusToken() {
    // Construct the request body with the API key, secret and grant type
    const authData = querystring.stringify({
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET,
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

// Route to get hotel sentiments
router.get('/hotel-sentiments', async (req, res) => {
    const { hotelIds } = req.query; // expects a comma-separated list of hotel IDs

    // Validate required parameters
    if (!hotelIds) {
        return res.status(400).send({ message: 'Required parameter: hotelIds.' });
    }

    // Retrieve the Amadeus API token from the Amadeus API server using the API key and secret
    let token;
    try {
        token = await getAmadeusToken();
    } catch (error) {
        return res.status(500).send({ message: 'Failed to authenticate with Amadeus', error: error.message });
    }

    // Send a GET request to the Amadeus API server to retrieve the hotel sentiments
    try {
        const sentimentsResponse = await axios.get(`https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments`, {
            params: { hotelIds: hotelIds },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.send(sentimentsResponse.data);
    } catch (error) {
        handleError(res, error);
    }
});

// Central error handling function, similar to your hotelList API
function handleError(res, error) {
    if (error.response) {
        return res.status(error.response.status).send({ message: 'Error retrieving hotel sentiments', error: error.response.data });
    } else {
        return res.status(500).send({ message: 'Unknown error', error: error.message });
    }
}

module.exports = router;

// to test this API url: http://localhost:3001/api/hotelRating/hotel-sentiments?hotelIds=PILONBHG
