const express = require('express');
const app = express();
const port = process.env.PORT || 3000;  
const dbOperations = require('./api/mongoDB.js');
const weatherRoutes = require('./api/weather.js');

// Middleware
app.use(express.json()); // Enable JSON parsing for incoming requests

// Enabling CORS (optional but useful if your API will be accessed from different domains)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routing
app.use('/api/weather', weatherRoutes); // Enable the weather routes for the /api/weather endpoint 

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Hello, Travel Planner!');
});

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
