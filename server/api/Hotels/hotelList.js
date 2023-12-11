const express = require('express'); // Express web server framework
const axios = require('axios'); // Axios HTTP client
const querystring = require('querystring'); // Node query string module
require('dotenv').config(); // Dotenv module to load environment variables from .env file

const router = express.Router(); // Express router
const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY; // Amadeus API key
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET; // Amadeus API secret

// Same function to retrieve the Amadeus API token
async function getAmadeusToken() {
    const authData = querystring.stringify({
        client_id: AMADEUS_API_KEY,
        client_secret: AMADEUS_API_SECRET,
        grant_type: 'client_credentials'
    });

    try { // Send a POST request to the Amadeus API server to retrieve the token
        const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', authData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return tokenResponse.data.access_token;
    } catch (error) { // Handle errors
        console.error("Error fetching Amadeus token:", error);
        throw error;
    }
    
}

// Endpoint to retrieve flight delay prediction from Amadeus API server using the parameters received from the query string
function constructHotelSearchURL(endpoint, params) {
    let url = `https://test.api.amadeus.com/v1/reference-data/locations/${endpoint}?`;

    for (let key in params) {
        if (params[key]) {
            url += `${key}=${params[key]}&`;
        }
    }

    return url.slice(0, -1);  // remove the trailing '&'
}

// Search Hotels using its unique Id
router.get('/hotels/by-hotels', async (req, res) => {
    const { hotelId } = req.query;

    if (!hotelId) {
        return res.status(400).send({ message: 'Required parameter: hotelId.' });
    }

    // Retrieve the Amadeus API token from the Amadeus API server using the API key and secret
    let token;
    try {
        token = await getAmadeusToken();
    } catch (error) {
        return res.status(500).send({ message: 'Failed to authenticate with Amadeus', error: error.message });
    }

    try {
        const hotelResponse = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/${hotelId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        res.send(hotelResponse.data);
    } catch (error) {
        handleError(res, error);
    }
});

// Search Hotels in a city
router.get('/hotels/by-city', async (req, res) => {
    const { cityCode, radius, radiusUnit, chainCodes, amenities, ratings, hotelSource } = req.query;

    if (!cityCode) {
        return res.status(400).send({ message: 'Required parameter: cityCode.' });
    }

    // Retrieve the Amadeus API token from the Amadeus API server using the API key and secret
    const queryParams = {
        cityCode,
        radius: radius || 5,
        radiusUnit: radiusUnit || 'KM',
        chainCodes,
        amenities,
        ratings,
        hotelSource: hotelSource || 'ALL'
    };

    await fetchHotelData(res, 'hotels/by-city', queryParams);
});

// Search Hotels using Geocode
router.get('/hotels/by-geocode', async (req, res) => {
    const { latitude, longitude, radius, radiusUnit, chainCodes, amenities, ratings, hotelSource } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).send({ message: 'Required parameters: latitude, longitude.' });
    }

    // Retrieve the Amadeus API token from the Amadeus API server using the API key and secret
    const queryParams = {
        latitude,
        longitude,
        radius: radius || 5,
        radiusUnit: radiusUnit || 'KM',
        chainCodes,
        amenities,
        ratings,
        hotelSource: hotelSource || 'ALL'
    };

    await fetchHotelData(res, 'hotels/by-geocode', queryParams);
});

// Search Hotels using Geocode and radius and radiusUnit and chainCodes and amenities and ratings and hotelSource
async function fetchHotelData(res, endpoint, queryParams) { // fetch hotel data from Amadeus
    let token;
    try { // Retrieve the Amadeus API token from the Amadeus API server using the API key and secret
        token = await getAmadeusToken();
    } catch (error) {
        return res.status(500).send({ message: 'Failed to authenticate with Amadeus', error: error.message });
    }

    try { // Send a GET request to the Amadeus API server to retrieve the flight delay prediction
        const hotelResponse = await axios.get(constructHotelSearchURL(endpoint, queryParams), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        res.send(hotelResponse.data);
    } catch (error) {
        handleError(res, error);
    }
}

// Central error handling function
function handleError(res, error) {
    if (error.response) {
        return res.status(error.response.status).send({ message: 'Error retrieving hotel information', error: error.response.data });
    } else {
        return res.status(500).send({ message: 'Unknown error', error: error.message });
    }
}

module.exports = router;

//search hotel by geocode: http://localhost:3001/api/hotelList/hotels/by-geocode?latitude=40.7128&longitude=-74.0060
// search hotel by city: http://localhost:3001/api/hotelList/hotels/by-city?cityCode=NYC
// search hotel by hotelId: http://localhost:3001/api/hotelList/hotels/by-hotels?hotelId=HJNYCCTB
// search with some more: http://localhost:3001/api/hotelList/hotels/by-city?cityCode=YOUR_CITY_CODE&radius=YOUR_RADIUS&radiusUnit=YOUR_RADIUS_UNIT&chainCodes=YOUR_CHAIN_CODES&amenities=YOUR_AMENITIES&ratings=YOUR_RATINGS&hotelSource=YOUR_HOTEL_SOURCE
// search with some more: http://localhost:3001/api/hotelList/hotels/by-geocode?latitude=YOUR_LATITUDE&longitude=YOUR_LONGITUDE&radius=YOUR_RADIUS&radiusUnit=YOUR_RADIUS_UNIT&chainCodes=YOUR_CHAIN_CODES&amenities=YOUR_AMENITIES&ratings=YOUR_RATINGS&hotelSource=YOUR_HOTEL_SOURCE
