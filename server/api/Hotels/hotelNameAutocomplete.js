const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const router = express.Router();
const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

// Function to retrieve the Amadeus API token
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

    if (!keyword) {
        return res.status(400).send({ message: 'Required parameter: keyword.' });
    }

    if(!subType) {
        return res.status(400).send({ message: 'Required parameter: subType.' });
    }

    let subTypes = Array.isArray(subType) ? subType : [subType]; // Convert to array if not already

    // Validate subTypes array to only contain allowed values
    const allowedSubTypes = ['HOTEL_LEISURE', 'HOTEL_GDS'];
    subTypes = subTypes.filter(type => allowedSubTypes.includes(type));

    if (subTypes.length === 0) {
        return res.status(400).send({ message: 'Invalid subType parameter. Must be "HOTEL_LEISURE" or "HOTEL_GDS".' });
    }

    let token;
    try {
        token = await getAmadeusToken();
    } catch (error) {
        return res.status(500).send({ message: 'Failed to authenticate with Amadeus', error: error.message });
    }

    const queryParams = {
        keyword,
        subType: subTypes.join(','), // Convert array to comma-separated string
    };

    try {
        const hotelResponse = await axios.get(constructHotelSearchURL('hotel', queryParams), {  // 'autocomplete' replaced with 'hotel'
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        res.send(hotelResponse.data);
    } catch (error) {
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