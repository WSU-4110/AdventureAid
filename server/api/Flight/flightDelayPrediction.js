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

router.get('/', async (req, res) => {
   
});

module.exports = router;