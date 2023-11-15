/*const express = require('express');
const router = express.router;

app.use(express.json());

app.post('/signup', (req, res) => {
  console.log(req.body); // This will log the JSON payload sent in the request
  res.send('Received your request!');
});
*/

class Vacation {
  constructor() {
    this.destinations = [];
    this.numOfDestinations = 0;
  }

  pushDestination(destination) {
    if (!destination || typeof destination !== 'string') {
      throw new Error('Invalid destination');
    }
    this.destinations.push(destination);  //enqueue
    this.numOfDestinations += 1
  }

  removeDestination(destination) {
    if (!destination || typeof destination !== 'string') {
      throw new Error('Invalid destination');
    }
    if (this.numOfDestinations == 0) {
      throw new Error('Destinations array is already empty');
    }
    this.destinations = this.destinations.filter(item => item !== destination);
    this.numOfDestinations -= 1
  }

  removeAllDestinations() {
    this.destinations = [];
    this.numOfDestinations = 0;
  }

  getAllDestinations() {
    return this.destinations;
  }

  getNumOfDestinations() {
    return this.numOfDestinations;
  }
}

module.exports = Vacation;