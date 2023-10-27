const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;  
const dbOperations = require('./api/mongoDB.js');
const flightStatusRoutes = require('./api/flightStatus.js');
const weatherRoutes = require('./api/weather.js');
const mongoose = require('mongoose');
const signupRoute = require('./routes/signupRoute');
const flightSearchRoutes = require('./api/flightSearch.js');
require("dotenv").config();
const User = require('./schemas/signupdata');

/*dbOperations.connect(process.env.DB_UEI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(()=>{
  console.log('Successful');
}).catch((err) => console.log('No Connection'));*/

// Middleware
app.use(express.json()); // Enable JSON parsing for incoming requests

// Enabling CORS
app.use(cors({ origin: 'http://localhost:3000' })); // This enables all CORS requests

// Routing
app.use('/api/weather', weatherRoutes); // Enable the weather routes for the /api/weather endpoint 
app.use('/api/flightStatus', flightStatusRoutes); // Enable the flight status routes for the /api/flightStatus endpoint
app.use('/api/flightSearch', flightSearchRoutes); // Enable the flight search routes for the /api/flightSearch endpoint

app.use('/routes',signupRoute);
// Root Endpoint
app.get('/', (req, res) => {
  res.send('Hello, Travel Planner!');
});

app.get('/api/googlemapsapikey', (req, res) => {
  // Retrieve the API key from environment variables or a secure config file.
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  res.json({ apiKey });
});

dbOperations.connect()
  .then(() => {
    console.log(`Server is running on port ${port}`);
    app.listen(port);  // Start the server after ensuring the database is connected.
  })
  .catch(error => {
    console.error('Error while connecting:', error);
  });
/*
// Starting the Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  
  // Ensure MongoDB is connected before performing operations.
  dbOperations.connect()
    .then(() => {
      // Perform MongoDB operations here after successful connection.
      return dbOperations.find("UserProfiles", {name: "Dan Pop"});
    })
    .then(result => {
      // Handle the result of the find operation here.
      console.log(result);
    })
    .catch(error => {
      // Handle connection or operation errors here.
      console.error('Error while connecting or performing operation:', error);
    });
});
*/