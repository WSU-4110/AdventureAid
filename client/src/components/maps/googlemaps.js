import React, { useEffect } from 'react';
import { googleMapsOperations } from './googlemapsAPI';

function MapComponent() {

    useEffect(() => {
        // Fetch the Google Maps API key from the server.
        fetch('http://localhost:3001/api/googlemapsapikey')
            .then(response => response.json()) //read the body of the response and parse it as JSON, returns a promise
            .then(data => {
                //extract the apiKey from parsed JSON data into the googlemapAPI
                const loader = googleMapsOperations.getLoader(data.apiKey);
                //return googlemaps script with map loader as input
                return googleMapsOperations.loadGoogleMapsScript(loader);   
            })
            .then(() => {
                //create google map object to display
                googleMapsOperations.initalizeMap();
                googleMapsOperations.showCurrentLocation();
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, []);

    return <div id="map" style={{ width: '100%', height: '700px' }}></div>;
}

export default MapComponent;