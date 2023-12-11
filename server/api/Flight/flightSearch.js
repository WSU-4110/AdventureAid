const express = require('express'); // Express web server framework 
const axios = require('axios'); // Axios HTTP client
const querystring = require('querystring'); // Node query string module
require('dotenv').config(); // Dotenv module to load environment variables from .env file

const router = express.Router(); // Express router
const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY; // Amadeus API key
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET; // Amadeus API secret

// Function to retrieve the Amadeus API token
async function getAmadeusToken() {
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
        }); // Send a POST request to the Amadeus API server to retrieve the token
        return tokenResponse.data.access_token;
    } catch (error) {
        console.error("Error fetching Amadeus token:", error);
        throw error;
    }
}

// Endpoint to retrieve flight delay prediction from Amadeus API server using the parameters received from the query string
router.get('/flight-offers', async (req, res) => {
    const {
        origin, destination, departureDate, adults, returnDate, children, infants,
        travelClass, includedAirlineCodes, excludedAirlineCodes,  nonStop, currencyCode, maxPrice, max
    } = req.query;

    // Validate required parameters
    if (!origin || !destination || !departureDate || !adults) {
        return res.status(400).send({ message: 'Required parameters: origin, destination, departureDate.' });
    }

    // Retrieve the Amadeus API token from the Amadeus API server using the API key and secret
    let token;
    try {
        token = await getAmadeusToken();
    } catch (error) {
        return res.status(500).send({ message: 'Failed to authenticate with Amadeus', error: error.message });
    }

    // Construct the request URL with the parameters received from the query string
    let url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}`;
    // Add optional parameters to the request URL
    if (returnDate) url += `&returnDate=${returnDate}`;
    if (children) url += `&children=${children}`;
    if (infants) url += `&infants=${infants}`;
    if (travelClass) url += `&travelClass=${travelClass.toUpperCase()}`;
    if (includedAirlineCodes) url += `&includedAirlineCodes=${includedAirlineCodes}`; // This option ensures that the system will only consider these airlines
    if(excludedAirlineCodes) url += `&excludedAirlineCodes=${excludedAirlineCodes}`; // This option ensures that the system will not consider these airlines.
    if (nonStop) url += `&nonStop=${nonStop}`; // This option ensures that the system will only consider direct flights.
    if (currencyCode) url += `&currencyCode=${currencyCode}`; // the preferred currency for the flight offers
    if (maxPrice) url += `&maxPrice=${maxPrice}`; // the maximum price for the flight offers
    if (max) url += `&max=${max}`; // the maximum number of flight offers to return

    // Send a GET request to the Amadeus API server to retrieve the flight delay prediction
    try {
        const flightOffersResponse = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        res.send(flightOffersResponse.data);
    } catch (error) { // Handle errors
        if (error.response) {
            return res.status(error.response.status).send({ message: 'Error retrieving flight offers', error: error.response.data });
        } else {
            return res.status(500).send({ message: 'Unknown error', error: error.message });
        }
    }
});

// to test this endpoint, use the following URL: http://localhost:3001/api/flightSearch/flight-offers?origin=NYC&destination=LAX&departureDate=2023-10-25&adults=1


module.exports = router;
