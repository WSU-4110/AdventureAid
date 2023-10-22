import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { googleMapsOperations } from './googlemapsAPI';

function MapComponent() {
    let mapInstance; // Declare mapInstance in the outer scope

    useEffect(() => {
        // Fetch the Google Maps API key from the server.
        fetch('http://localhost:3001/api/googlemapsapikey')
            .then(response => response.json())
            .then(data => {
                const loader = googleMapsOperations.getLoader(data.apiKey);
                return googleMapsOperations.loadGoogleMapsScript(loader);   
            })
            .then(() => {
                // Initialize the map and assign it to mapInstance
                mapInstance = googleMapsOperations.initalizeMap();
                googleMapsOperations.showCurrentLocation();

                const addMarkerButton = document.createElement("button");
                addMarkerButton.textContent = "Add Marker";
                addMarkerButton.classList.add("custom-map-control-button");
               
                // Check if mapInstance.controls exists before adding the button
                if (mapInstance.controls) {
                    mapInstance.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(addMarkerButton);
                } else {
                    console.error("mapInstance.controls is undefined");
                }
        
                // Event listener to add markers when the button is clicked
                addMarkerButton.addEventListener("click", () => {
                    // Prompt the user for latitude and longitude
                    const lat = parseFloat(prompt("Enter Latitude:"));
                    const lng = parseFloat(prompt("Enter Longitude:"));
        
                    // Check if valid coordinates are entered
                    if (!isNaN(lat) && !isNaN(lng)) {
                        googleMapsOperations.addMarker(lat, lng);
                    } else {
                        alert("Invalid coordinates. Please enter valid numbers.");
                    }
                    googleMapsOperations.calculateAndDisplayRoute('Wayne State University', 'Los Angeles, CA');
                });
                
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, []);

    return (
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        opacity= "0.5"
    >
        <Box id="map" sx={{ width: '95%', height: '400px' }} />
        <Box id="routeInfo" sx={{ marginTop: '1rem' }}>
            <span id="distance"></span>
            <span id="duration"></span>
        </Box>
    </Box>
    );
}

export default MapComponent;
