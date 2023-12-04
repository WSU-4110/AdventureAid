import React, { useState } from 'react';
import axios from 'axios';
import { KillOthers } from 'concurrently';

const FlightSearchComponent = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    adults: '',
    returnDate: '',
    children: '',
    infants: '',
    travelClass: '',
    includedAirlineCodes: '',
    excludedAirlineCodes: '',
    nonStop: false,
    currencyCode: '',
    maxPrice: '',
    max: ''
  });
  const [flightOffers, setFlightOffers] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();KillOthers
    try {
      const response = await axios.get('http://localhost:3001/api/flightSearch/flight-offers', { params: formData });
      setFlightOffers(response.data);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields for each parameter */}
        {/* Example for a few fields: */}
        <input type="text" name="origin" value={formData.origin} onChange={handleChange} placeholder="Origin" />
        <input type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination" />
        <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} placeholder="Departure Date" />
        <input type="number" name="adults" value={formData.adults} onChange={handleChange} placeholder="Adults" />
        {/* Add other fields as needed */}
        <button type="submit">Search Flights</button>
      </form>

      {flightOffers && (
        <div>
          <h2>Flight Offers:</h2>
          <pre>{JSON.stringify(flightOffers, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FlightSearchComponent;
