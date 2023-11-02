const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const router = express.Router();
const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

// Same function to retrieve the Amadeus API token
async function getAmadeusToken() {
    const authData = querystring.stringify({
        client_id: AMADEUS_API_KEY,
        client_secret: AMADEUS_API_SECRET,
        grant_type: 'client_credentials'
    });

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


async function fetchHotelData(res, endpoint, queryParams) { // fetch hotel data from Amadeus
    let token;
    try {
        token = await getAmadeusToken();
    } catch (error) {
        return res.status(500).send({ message: 'Failed to authenticate with Amadeus', error: error.message });
    }

    try {
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
