import React, { useState } from 'react';
import axios from 'axios';

const FlightDelayPredictionComponent = () => {
  const [formData, setFormData] = useState({
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    aircraftCode: '',
    carrierCode: '',
    flightNumber: '',
    duration: ''
  });
  const [predictionResult, setPredictionResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/api/flightDelayPrediction', { params: formData });
      setPredictionResult(response.data);
    } catch (error) {
      console.error('Error fetching flight delay prediction:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields for each parameter */}
        <input type="text" name="originLocationCode" value={formData.originLocationCode} onChange={handleChange} placeholder="Origin Location Code" />
        {/* ... more inputs for other parameters ... */}
        <button type="submit">Predict Flight Delay</button>
      </form>

      {predictionResult && (
        <div>
          <h2>Prediction Result:</h2>
          <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FlightDelayPredictionComponent;
