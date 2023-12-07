import React, { useState } from 'react';
import './placesautocomplete.scss';

function SimpleSearchBar({onPlaceSearch, onLocationSearch}) {
    const [placeInput, setPlaceInput] = useState('');
    const [locationInput, setLocationInput] = useState('');

    const handlePlaceSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submit action
        onLocationSearch(null);
        onPlaceSearch(placeInput); // Use the input state when submitting
    };
    const handleLocationSubmit = (event) => {
        event.preventDefault();
        onPlaceSearch(null);
        onLocationSearch(locationInput)
    }

    return (
        <>
            <h3><center>Search Place Ideas</center></h3>
            <form onSubmit={handlePlaceSubmit} className="search-form">
                <input
                    className="search-input"
                    value={placeInput}
                    onChange={(e) => setPlaceInput(e.target.value)}
                    placeholder="Enter place ideas (Tacos in Detroit)"
                    type="text"
                />
                <button type="submit" className="search-submit-button">
                    Search
                </button>
            </form>
            <h3><center>Search Localities</center></h3>
            <form onSubmit={handleLocationSubmit} className="search-form">
                <input
                        className="search-input"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        placeholder="Enter City (Detroit)"
                        type="text"
                    />
                    <button type="submit" className="search-submit-button">
                        Search
                    </button>
            </form>
        </>
    );
}

export default SimpleSearchBar;
