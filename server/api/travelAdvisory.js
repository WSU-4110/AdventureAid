const express = require('express'); // You'll need to install express if running this on the server side 
const fetch = require('node-fetch');  // You'll need to install node-fetch if running this on the server side

const app = express(); // Create an express app

// Function to get travel advisory data for a specific country
async function getAdvisoryData(countryCode) {
    const apiUrl = 'https://www.travel-advisory.info/api';
    try {
        const response = await fetch(`${apiUrl}?countrycode=${countryCode}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json(); // Extract the JSON data from the response
        return data; // Return the data
    } catch (error) { // Handle errors
        console.error('There has been a problem with your fetch operation:', error);
        throw error;  // Re-throw the error so it can be handled by the calling function
    }
}

// Define a route for GET /advisory/:countryCode
app.get('/advisory/:countryCode', async (req, res) => {
    const { countryCode } = req.params;  // Extract the country code from the request parameters
    try {
        const advisoryData = await getAdvisoryData(countryCode);
        res.send(advisoryData);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving advisory data', error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
