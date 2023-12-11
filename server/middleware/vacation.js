class Destination {
  constructor(name, address, date, coordinates) {
    this.name = name      //string
    this.address = address   //string
    this.date = date     //date object
    this.coordinates = coordinates //size 2 array with lat and long
  }
}

class Vacation {
  constructor() {
    this.locality = '';     //string
    this.name = '';         //string
    this.startDate = null;  //date object
    this.endDate = null;    //date object
    this.destinations = []; //array filled with destination instances
    
    this.attractions = [];
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

  getLastDestination() {
    return this.destinations[this.getNumOfDestinations()-1];
  }

  getAllDestinations() {
    return this.destinations;
  }

  getNumOfDestinations() {
    return this.destinations.length;
  }
/*
  async fetchAttractions() {
    try {
      const response = await fetch(`/api/attractions?locality=${this.locality}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.attractions = await response.json();
    } catch (error) {
      console.error('Error fetching attractions:', error);
      throw error; // Or handle it as needed
    }
  }*/
  /*
  async fetchAttractions() {
    // this.locality encoded to be placed in a URL
    const encodedLocality = encodeURIComponent(this.locality);
    const response = await fetch(`http://localhost:3001/api/attractions?locality=${encodedLocality}`);
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    this.attractions = await response.json();
  }*/

  async fetchAttractions() {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    try {
      // First, geocode the place name to get the coordinates
      const geoResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.locality)}&key=apiKey`);
      if (!geoResponse.ok) {
        throw new Error('Geocoding response was not ok');
      }
      const geoData = await geoResponse.json();
  
      // Make sure you got a valid response
      if (geoData.status !== 'OK' || !geoData.results[0]) {
        throw new Error('Geocoding failed');
      }
  
      const location = geoData.results[0].geometry.location;
  
      // Now, with the coordinates, make a request to the Places API
      const placesResponse = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=tourist_attraction&key=apiKey`);
      if (!placesResponse.ok) {
        throw new Error('Places API response was not ok');
      }
      const placesData = await placesResponse.json();
      if (placesData.status !== 'OK') {
        throw new Error('Places API search failed');
      }
  
      // Assign the results to the attractions property
      this.attractions = placesData.results;
    } catch (error) {
      console.error('Error fetching attractions:', error);
      // Handle the error according to your application's needs
    }
  }
  
}

module.exports = { Vacation, Destination };