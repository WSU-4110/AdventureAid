import React, { useState } from 'react';
import './placesautocomplete.scss';

function SimpleSearchBar({ onSearch }) {
    const [input, setInput] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submit action
        onSearch(input); // Use the input state when submitting
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                className="search-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your address"
                type="text"
            />
            <button type="submit" className="search-submit-button">
                Search
            </button>
        </form>
    );
}

export default SimpleSearchBar;
