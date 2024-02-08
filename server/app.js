const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const signupRoute = require('./routes/signupRoute');
const flightStatusRoutes = require('./api/Flight/flightStatus');
const flightSearchRoutes = require('./api/Flight/flightSearch');
const flightDelayPrediction = require('./api/Flight/flightDelayPrediction');
const weatherRoutes = require('./api/Weather/weather');
const hotelListRoutes = require('./api/Hotels/hotelList');
// Add any other routes you have

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Route registrations
app.use('/api/flightStatus', flightStatusRoutes);
app.use('/api/flightSearch', flightSearchRoutes);
app.use('/api/flightDelayPrediction', flightDelayPrediction);
app.use('/api/weather', weatherRoutes);
app.use('/api/hotelList', hotelListRoutes);
app.use('/api', signupRoute);
// Add any other routes here

module.exports = app; // Export the app
