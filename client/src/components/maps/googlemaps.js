import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { googleMapsOperations } from './googlemapsAPI';

function MapComponent({searchInput}) {

    const mapInstanceRef = useRef(null);

    useEffect(() => {
        async function initializeMap() {
            if (!mapInstanceRef.current) {
                try {
                    const response = await fetch('http://localhost:3001/api/googlemapsapikey');
                    const data = await response.json();
                    await googleMapsOperations.getLoaderAndLoadGoogleMapsScript(data.apiKey);
    
                    // Initialize the map and assign it to the ref
                    mapInstanceRef.current = googleMapsOperations.initalizeMap();
                    googleMapsOperations.showCurrentLocation();
    
                    const addMarkerButton = document.createElement("button");
                    addMarkerButton.textContent = "Add Marker";
                    addMarkerButton.classList.add("custom-map-control-button");
    
                    // Check if mapInstance.controls exists before adding the button
                    if (mapInstanceRef.current.controls) {
                        mapInstanceRef.current.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(addMarkerButton);
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
                    });
                    //googleMapsOperations.findPlaces("tacos in Seattle");
                    //setTimeout(() => googleMapsOperations.findPlaces("Burgers in Sterling Heights"), 3000);

                } catch (error) {
                    console.error("Error:", error);
                }
            }
        }
    
        initializeMap();
    }, []);
    

    useEffect(() => {
        // This effect runs when searchInput changes
        if (searchInput && mapInstanceRef.current) {
            googleMapsOperations.findPlaces(searchInput);
        }
    }, [searchInput]);


    return (
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        opacity= "0.5"
    >
        <Box id="map" sx={{ width: '75%', height: '400px' }} />
        <Box id="routeInfo" sx={{ marginTop: '1rem' }}>
            <span id="distance"></span>
            <span id="duration"></span>
        </Box>
    </Box>
    );
}

export default MapComponent;