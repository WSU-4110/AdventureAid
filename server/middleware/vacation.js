class Destination {
  constructor(name) {
    this.name = name      //string
    this.date = null      //date object
    this.coordinates = [] //size 2 array with lat and long
  }
}

class Vacation {
  constructor() {
    this.locality = '';     //string
    this.name = '';         //string
    this.startDate = null;  //date object
    this.endDate = null;    //date object
    this.destinations = []; //array filled with destination instances
  }

  planVacation(locality, startDate, endDate) {
    this.locality = locality 
    this.name = `Trip to ${locality}`;
    //startDate and endDate are provided as date strings from the request, they can be converted to Date objects
    //validation to check the format of the dates
    this.startDate = startDate ? new Date(startDate) : null;
    this.endDate = endDate ? new Date(endDate) : null;
  }

  pushDestination(destination) {
    if (!(destination instanceof Destination)) {
      throw new Error('Invalid destination');
    }
    this.destinations.push(destination);  //enqueue
  }

  removeDestination(destinationName) {
    if (!destinationName || typeof destinationName !== 'string') {
      throw new Error('Invalid destination');
    }
    this.destinations = this.destinations.filter(dest => dest.name !== destinationName);
  }

  removeAllDestinations() {
    this.destinations = [];
  }

  getAllDestinations() {
    return this.destinations;
  }

  getNumOfDestinations() {
    return this.destinations.length;
  }
}

module.exports = { Vacation, Destination };