const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;  

const https = require('https');

require('./api/connection.js');
const dbOperations = require('./api/mongoDB.js');
const flightStatusRoutes = require('./api/Flight/flightStatus.js');
const weatherRoutes = require('./api/Weather/weather.js');
const flightSearchRoutes = require('./api/Flight/flightSearch.js');
const hotelListRoutes = require('./api/Hotels/hotelList.js');
const hotelNameAutocompleteRoutes = require('./api/Hotels/hotelNameAutocomplete.js');
const flightDelayPrediction = require('./api/Flight/flightDelayPrediction.js');
const budgetPlannerRoutes = require('./api/Budget/budgetPlanner.js');
require("dotenv").config();
const { Destination, Vacation } = require("./middleware/vacation.js");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/signupRoute.js');
const hotelRating = require('./api/Hotels/hotelRating.js');
const db = require('./api/mongoDB');
const categoryRatedAreas = require('./api/Location/categoryRatedAreas.js');
const { required } = require('joi');

// Middleware
app.use(express.json()); // Enable JSON parsing for incoming requests
app.use(bodyParser.json());

// Enabling CORS
app.use(cors({ origin: 'http://localhost:3000' })); // This enables all CORS requests

// Routing
app.use('/api/weather', weatherRoutes); // Enable the weather routes for the /api/weather endpoint 
app.use('/api/flightStatus', flightStatusRoutes); // Enable the flight status routes for the /api/flightStatus endpoint
app.use('/api/flightSearch', flightSearchRoutes); // Enable the flight search routes for the /api/flightSearch endpoint
app.use('/api/hotelList', hotelListRoutes); // Enable the hotel list routes for the /api/hotelList endpoint
app.use('/api/hotelNameAutocomplete', hotelNameAutocompleteRoutes); // Enable the hotel name autocomplete routes for the /api/hotelNameAutocomplete endpoint
app.use('/api',userRoute); // Enable the user route for signup/login endpoint.
app.use('/api/hotelRating', hotelRating); // Enable the hotel rating routes for the /api/hotelRating endpoint
app.use('/api/flightDelayPrediction', flightDelayPrediction); // Enable the flight delay prediction routes for the /api/flightDelayPrediction endpoint
app.use('/api/categoryRatedAreas', categoryRatedAreas); // Enable the category rated areas routes for the /api/categoryRatedAreas endpoint
app.use('/api/budgetPlanner', budgetPlannerRoutes);
// Root Endpoint
app.get('/', (req, res) => {
  res.send('Hello, Travel Planner!');
});

app.get('/api/googlemapsapikey', (req, res) => {
  // Retrieve the API key from environment variables or a secure config file.
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  res.json({ apiKey });
});
/*
app.get('/api/attractions', (req, res) => {
  const locality = req.query.locality;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locality}&radius=5000&type=tourist_attraction&key=${apiKey}`;

  https.get(url, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        console.log(parsedData,'parseddata>>>');
        res.json(parsedData.results);
      } catch (e) {
        console.error(e.message);
        res.status(500).send('Error parsing attractions data');
      }
    });

  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    res.status(500).send('Error fetching attractions');
  });
});*/


app.get('/api/attractions', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!city) {
    return res.status(400).send('City name is required');
  }

  try {
    // Step 1: Geocode the city name
    const geocodeResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${apiKey}`);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.status !== 'OK' || !geocodeData.results[0]) {
      throw new Error('Geocoding failed');
    }

    const location = geocodeData.results[0].geometry.location;

    // Step 2: Use the coordinates to query the Places API
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=tourist_attraction&key=${apiKey}`;
    https.get(placesUrl, (placesRes) => {
      let placesData = '';

      placesRes.on('data', (chunk) => {
        placesData += chunk;
      });

      placesRes.on('end', () => {
        try {
          const placesResults = JSON.parse(placesData);
          if (placesResults.status !== 'OK') {
            throw new Error('Places API search failed');
          }
          res.json(placesResults.results);
        } catch (e) {
          console.error(e.message);
          res.status(500).send('Error parsing places data');
        }
      });

    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`);
      res.status(500).send('Error fetching attractions');
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


const vacationInstance = new Vacation();

app.post('/start-planning-vacation', (req,res) => {
  try {
    const { locality, startDate, endDate } = req.body;
    vacationInstance.planVacation(locality, startDate, endDate);
    console.log(vacationInstance);
    res.status(200).send('Vacation created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post('/push-destination', (req, res) => {
  try {
      let destinationInstance = new Destination(req.body.destination)
      vacationInstance.pushDestination(destinationInstance);
      console.log(vacationInstance.getAllDestinations());
      res.status(200).send('Destination added successfully');
  } catch (error) {
      res.status(400).send(error.message);
  }
});

app.post('/remove-destination', (req, res) => {
  try {
    vacationInstance.removeDestination(req.body.destination);
    console.log(vacationInstance.getAllDestinations());
    res.status(200).send("Destination deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.post('/remove-all-destinations', (req, res) => {
  try {
    vacationInstance.removeAllDestinations();
    console.log(vacationInstance.getAllDestinations());
    res.status(200).send("All destinations deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.post('/get-vacation-name', (req,res) => {
  try {
    const vacationName = vacationInstance.name;
    res.status(200).send({vacationName});
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.post('/get-vacation-locality', (req,res) => {
  try {
    const vacationLocality = vacationInstance.locality;
    res.status(200).send({vacationLocality});
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.post('/get-vacation-startdate', (req,res) => {
  try {
    const vacationStartDate = vacationInstance.startDate;
    res.status(200).send({vacationStartDate});
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.post('/get-vacation-enddate', (req,res) => {
  try {
    const vacationEndDate = vacationInstance.endDate;
    res.status(200).send({vacationEndDate});
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.post('/create-and-add-destination', (req,res) => {
  try {
    let destinationInstance = new Destination(req.body.name, req.body.address, req.body.date, req.body.coordinates)
    vacationInstance.pushDestination(destinationInstance);
    console.log(vacationInstance.getAllDestinations());
    res.status(200).send('Destination added successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
})

// Starting the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});