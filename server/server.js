const cors = require('cors');
const express = require('express');
const app = express();
const app=require('./app');
const PORT = process.env.PORT || 3001;  
require('./api/connection.js');
const dbOperations = require('./api/mongoDB.js');
const flightStatusRoutes = require('./api/Flight/flightStatus.js');
const weatherRoutes = require('./api/Weather/weather.js');
//const mongoose = require('mongoose');
//const signupRoute = require('./routes/signupRoute');
const flightSearchRoutes = require('./api/Flight/flightSearch.js');
const hotelListRoutes = require('./api/Hotels/hotelList.js');
const flightDelayPrediction = require('./api/Flight/flightDelayPrediction.js');
require("dotenv").config();
const Vacation = require("./middleware/index.js");
//const User = require('./schemas/signupdata');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/signupRoute.js');

const db = require('./api/mongoDB');
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
app.use('/api',userRoute);
app.use('/api/flightDelayPrediction', flightDelayPrediction); // Enable the flight delay prediction routes for the /api/flightDelayPrediction endpoint
// Root Endpoint
app.get('/', (req, res) => {
  res.send('Hello, Travel Planner!');
});

app.get('/api/googlemapsapikey', (req, res) => {
  // Retrieve the API key from environment variables or a secure config file.
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  res.json({ apiKey });
});



const vacationInstance = new Vacation();

app.post('/push-destination', (req, res) => {
  try {
      vacationInstance.pushDestination(req.body.destination);
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

// Starting the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});