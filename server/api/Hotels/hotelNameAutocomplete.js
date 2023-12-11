const express = require('express'); // Express web server framework
const axios = require('axios'); // Axios HTTP client
const querystring = require('querystring'); // Node query string module
require('dotenv').config(); // Dotenv module to load environment variables from .env file

const router = express.Router(); // Express router
const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY; // Amadeus API key
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET; // Amadeus API secret

// Function to retrieve the Amadeus API token
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


// Function to construct the URL for hotel search
function constructHotelSearchURL(endpoint, params) {
    let url = `https://test.api.amadeus.com/v1/reference-data/locations/${endpoint}?`;

    for (let key in params) {
        if (params.hasOwnProperty(key) && params[key]) {
            url += `${key}=${encodeURIComponent(params[key])}&`;
        }
    }

    return url.slice(0, -1);  // Remove the trailing '&'
}

// Hotel name autocomplete endpoint
router.get('/hotels/autocomplete', async (req, res) => {
    const { keyword, subType } = req.query;

    // Validate required parameters
    if (!keyword) {
        return res.status(400).send({ message: 'Required parameter: keyword.' });
    }

    // Validate subType parameter
    if(!subType) {
        return res.status(400).send({ message: 'Required parameter: subType.' });
    }

    let subTypes = Array.isArray(subType) ? subType : [subType]; // Convert to array if not already

    // Validate subTypes array to only contain allowed values
    const allowedSubTypes = ['HOTEL_LEISURE', 'HOTEL_GDS'];
    subTypes = subTypes.filter(type => allowedSubTypes.includes(type));

    // Validate subTypes array to contain at least one value
    if (subTypes.length === 0) {
        return res.status(400).send({ message: 'Invalid subType parameter. Must be "HOTEL_LEISURE" or "HOTEL_GDS".' });
    }

    // Retrieve the Amadeus API token from the Amadeus API server using the API key and secret
    let token;
    try {
        token = await getAmadeusToken();
    } catch (error) {
        return res.status(500).send({ message: 'Failed to authenticate with Amadeus', error: error.message });
    }

    // Construct the request URL with the parameters received from the query string
    const queryParams = {
        keyword,
        subType: subTypes.join(','), // Convert array to comma-separated string
    };

    // Send a GET request to the Amadeus API server to retrieve the hotel name autocomplete results
    try {
        const hotelResponse = await axios.get(constructHotelSearchURL('hotel', queryParams), {  // 'autocomplete' replaced with 'hotel'
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        res.send(hotelResponse.data);
    } catch (error) { // Handle errors
        handleError(res, error);
    }
});

// Central error handling function
function handleError(res, error) {
    if (error.response) {
        return res.status(error.response.status).send({ message: 'Error retrieving hotel information', error: error.response.data });
    } else {
        return res.status(500).send({ message: 'Unknown error', error: error.message });
    }
}


module.exports = router;


// testing links:
// http://localhost:3001/api/hotelNameAutocomplete/hotels/autocomplete?keyword=PARI&subType=HOTEL_LEISURE
// http://localhost:3001/api/hotelNameAutocomplete/hotels/autocomplete?keyword=PARI&subType=HOTEL_GDS