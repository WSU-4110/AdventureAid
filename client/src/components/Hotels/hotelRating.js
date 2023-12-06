import React, { useState } from 'react';
import axios from 'axios';

function HotelSentiments() {
    const [hotelIds, setHotelIds] = useState('');
    const [sentiments, setSentiments] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setHotelIds(e.target.value);
    };

    const fetchSentiments = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/hotelRating/hotel-sentiments`, {
                params: { hotelIds }
            });
            setSentiments(response.data);
            setError('');
        } catch (err) {
            setError(err.message);
            setSentiments(null);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={hotelIds} 
                onChange={handleInputChange} 
                placeholder="Enter Hotel IDs (comma-separated)" 
            />
            <button onClick={fetchSentiments}>Get Sentiments</button>

            {error && <p>Error: {error}</p>}
            {sentiments && <div>
                <h3>Sentiment Data:</h3>
                <pre>{JSON.stringify(sentiments, null, 2)}</pre>
            </div>}
        </div>
    );
}

export default HotelSentiments;
