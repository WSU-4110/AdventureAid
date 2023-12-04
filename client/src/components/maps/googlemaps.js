import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { googleMapsOperations } from './googlemapsAPI';
import { vacationOperations } from '../middleware-apis/vacationOperations';

function MapComponent({searchPlaceInput, searchLocationInput}) {

    const [defaultLocality, setDefaultLocality] = useState('');
    const mapInstanceRef = useRef(null);

    async function fetchVacationLocality() {
        try {
          const locality = await vacationOperations.getLocality();
          setDefaultLocality(locality);
          return locality;
        } catch (error) {
          console.error('Error fetching vacation locality:', error);
        }
    };

    async function initializeMap(locality) {
        if (!mapInstanceRef.current && locality) {
            try {
                const response = await fetch('http://localhost:3001/api/googlemapsapikey');
                const data = await response.json();
                await googleMapsOperations.getLoaderAndLoadGoogleMapsScript(data.apiKey);

                // Initialize the map and assign it to the ref
                mapInstanceRef.current = googleMapsOperations.initalizeMap(locality);
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
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    useEffect(() => {
        // Call initializeMap with the fetched locality
        fetchVacationLocality().then(locality => {
            if (locality) {
                initializeMap(locality);
            }
        });
    }, []);
    

    useEffect(() => {
        // This effect runs when searchInput changes
        if (mapInstanceRef.current)
        {
            if (searchPlaceInput)
                googleMapsOperations.findPlaces(searchPlaceInput);
            if (searchLocationInput)
                googleMapsOperations.searchLocation(searchLocationInput);
        }
        
    }, [searchPlaceInput, searchLocationInput]);


    return (
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginY="3rem"
        opacity= "0.5"
    >
        <Box id="map" sx={{ width: '100%', height: '600px' }} />
        <Box id="routeInfo" sx={{ marginTop: '1rem' }}>
            <span id="distance"></span>
            <span id="duration"></span>
        </Box>
    </Box>
    );
}

export default MapComponent;