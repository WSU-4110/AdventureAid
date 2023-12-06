import React, { useState } from 'react';
import axios from 'axios';

function HotelSearch() {
    const [searchParams, setSearchParams] = useState({
        cityCode: '',
        latitude: '',
        longitude: '',
        radius: '',
        radiusUnit: 'KM',
        chainCodes: '',
        amenities: '',
        ratings: '',
        hotelSource: 'ALL',
        hotelId: '',
    });
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    const handleSearch = async (endpoint) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/hotelList/hotels/${endpoint}`, {
                params: searchParams
            });
            setResults(response.data);
        } catch (err) {
            setError('Failed to fetch data');
        }
    };

    return (
        <div>
            {/* Input fields for each parameter */}
            <input name="cityCode" value={searchParams.cityCode} onChange={handleInputChange} placeholder="City Code" />
            <input name="latitude" value={searchParams.latitude} onChange={handleInputChange} placeholder="Latitude" />
            <input name="longitude" value={searchParams.longitude} onChange={handleInputChange} placeholder="Longitude" />
            <input name="radius" type="number" value={searchParams.radius} onChange={handleInputChange} placeholder="Radius" />
            <input name="radiusUnit" value={searchParams.radiusUnit} onChange={handleInputChange} placeholder="Radius Unit" />
            <input name="chainCodes" value={searchParams.chainCodes} onChange={handleInputChange} placeholder="Chain Codes" />
            <input name="amenities" value={searchParams.amenities} onChange={handleInputChange} placeholder="Amenities" />
            <input name="ratings" value={searchParams.ratings} onChange={handleInputChange} placeholder="Ratings" />
            <input name="hotelSource" value={searchParams.hotelSource} onChange={handleInputChange} placeholder="Hotel Source" />
            <input name="hotelId" value={searchParams.hotelId} onChange={handleInputChange} placeholder="Hotel ID" />

            {/* Buttons for different search types */}
            <button onClick={() => handleSearch('by-city')}>Search by City</button>
            <button onClick={() => handleSearch('by-geocode')}>Search by Geocode</button>
            <button onClick={() => handleSearch('by-hotels')}>Search by Hotel ID</button>

            {/* Display results and errors */}
            {error && <p>{error}</p>}
            {results && <div>{JSON.stringify(results)}</div>}
        </div>
    );
}

export default HotelSearch;
