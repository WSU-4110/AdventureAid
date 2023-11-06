import React, { useState, useEffect, useRef } from 'react';
import './placesautocomplete.scss';

function PlacesAutocomplete({onPlaceSelected}) {
    const [input, setInput] = useState('');
    const [apiKey, setApiKey] = useState('');
    const autocompleteRef = useRef(null);

  useEffect(() => {
    // Fetch the API key from server
    const fetchApiKey = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/googlemapsapikey');
        const data = await response.json();
        setApiKey(data.apiKey); // Expecting the API key to be in the "apiKey" field of the JSON response
        loadGoogleScript(data.apiKey);
      } catch (error) {
        console.error('Failed to fetch the API key', error);
      }
    };

    fetchApiKey();
  }, []);

  const loadGoogleScript = (apiKey) => {
    if (!apiKey) return; // Don't load the script if the API key is not retrieved

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      initAutocomplete();
    };
  };

  const initAutocomplete = () => {
    if (!autocompleteRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      { types: ['geocode'] }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      setInput(place.formatted_address);
      alert("input is input");
      //onPlaceSelected(place.formatted_address); // Pass the address to the callback
    });
  };

  const handleSubmit = (event) => {
    alert("handledSubmit")
    event.preventDefault(); // Prevent the default form submit action
    onPlaceSelected(input); // Use the input state when submitting
  };

  // Render a loading state until the API key is fetched
  if (!apiKey) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="autocomplete-form">
      <input
        ref={autocompleteRef}
        className="autocomplete-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your address"
        type="text"
      />
      <button type="submit" className="autocomplete-submit-button">
        Search
      </button>
    </form>
  );
}

export default PlacesAutocomplete;
