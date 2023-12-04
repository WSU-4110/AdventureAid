import React, { useState } from 'react';
import axios from 'axios';

const FlightStatusComponent = () => {
  const [formData, setFormData] = useState({
    carrierCode: '',
    flightNumber: '',
    scheduledDepartureDate: ''
  });
  const [flightStatus, setFlightStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/api/flightStatus/flight-status', { params: formData });
      setFlightStatus(response.data);
    } catch (error) {
      console.error('Error fetching flight status:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="carrierCode" value={formData.carrierCode} onChange={handleChange} placeholder="Carrier Code" />
        <input type="text" name="flightNumber" value={formData.flightNumber} onChange={handleChange} placeholder="Flight Number" />
        <input type="date" name="scheduledDepartureDate" value={formData.scheduledDepartureDate} onChange={handleChange} placeholder="Scheduled Departure Date" />
        <button type="submit">Check Flight Status</button>
      </form>

      {flightStatus && (
        <div>
          <h2>Flight Status:</h2>
          <pre>{JSON.stringify(flightStatus, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FlightStatusComponent;