import React, { useState } from 'react';
import axios from 'axios';

function CategoryRatedAreas() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:3001/api/categoryRatedAreas/category-rated-areas`, {
                params: { latitude, longitude }
            });
            setResult(response.data);
            setError('');
        } catch (err) {
            setError(err.message);
            setResult(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="Latitude"
                    required
                />
                <input
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="Longitude"
                    required
                />
                <button type="submit">Get Category Rated Areas</button>
            </form>

            {result && <div><pre>{JSON.stringify(result, null, 2)}</pre></div>}
            {error && <div>Error: {error}</div>}
        </div>
    );
}

export default CategoryRatedAreas;
