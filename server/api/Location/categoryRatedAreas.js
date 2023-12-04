const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const router = express.Router();

// Reuse the getAmadeusToken function from your other modules
async function getAmadeusToken() {
    const authData = querystring.stringify({
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET,
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

// Route to get category rated areas
router.get('/category-rated-areas', async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).send({ message: 'Required parameters: latitude and longitude.' });
    }

    let token;
    try {
        token = await getAmadeusToken();
    } catch (error) {
        return res.status(500).send({ message: 'Failed to authenticate with Amadeus', error: error.message });
    }

    try {
        const locationResponse = await axios.get(`https://test.api.amadeus.com/v1/location/analytics/category-rated-areas`, {
            params: { latitude, longitude },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.send(locationResponse.data);
    } catch (error) {
        handleError(res, error);
    }
});

// Central error handling function
function handleError(res, error) {
    if (error.response) {
        return res.status(error.response.status).send({ message: 'Error retrieving hotel sentiments', error: error.response.data });
    } else {
        return res.status(500).send({ message: 'Unknown error', error: error.message });
    }
}

module.exports = router;

// to test url: http://localhost:3001/api/categoryRatedAreas/category-rated-areas?latitude=40.7128&longitude=-74.0060