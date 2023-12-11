import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { googleMapsOperations } from './googlemapsAPI';
import { vacationOperations } from '../middleware-apis/vacationOperations';

function MapComponent({searchPlaceInput, searchLocationInput, onAttractionsUpdate}) {

    const [defaultLocality, setDefaultLocality] = useState('');
    const mapInstanceRef = useRef(null);

    const [topAttractions, setTopAttractions] = useState([]);

    useEffect(() => {
        async function fetchVacationLocality() {
            try {
                const locality = await vacationOperations.getLocality();
                setDefaultLocality(locality);
            } catch (error) {
                console.error('Error fetching vacation locality:', error);
            }
        };

        fetchVacationLocality()
    }, []);
    
    async function initializeMap(locality) {
        if (!mapInstanceRef.current) {  //it only initializes the map once, once defaultLocality data is fetched and stored
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
        if (defaultLocality) {
          initializeMap(defaultLocality);
        }
        if (mapInstanceRef.current)
        {
            if (searchPlaceInput)
                googleMapsOperations.findPlaces(searchPlaceInput);
            if (searchLocationInput)
                googleMapsOperations.searchLocation(searchLocationInput);
        }
        
    }, [defaultLocality, searchPlaceInput, searchLocationInput]);

    useEffect(() => {
        if (defaultLocality && mapInstanceRef.current) {
            googleMapsOperations.findTopAttractions(defaultLocality)
            .then(attractions => {
                setTopAttractions(attractions);
            })
            .catch(error => {
                console.error('Error fetching top attractions:', error);
          
            });
        }
    }, [defaultLocality]);

    useEffect(() => {
        if (defaultLocality && mapInstanceRef.current) {
            googleMapsOperations.findTopAttractions(defaultLocality)
            .then(attractions => {
                setTopAttractions(attractions);
                onAttractionsUpdate(attractions); // Send the attractions data to the parent
            })
            .catch(error => {
                console.error('Error fetching top attractions:', error);
            });
        }
    }, [defaultLocality, onAttractionsUpdate]);

    return (
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginY="3rem"
        //opacity= "0.5"
    >
        <Box id="map" sx={{ width: '100%', height: '600px' }} />
        <Box id="routeInfo" sx={{ marginTop: '1rem' }}>
            <span id="distance"></span>
            <span id="duration"></span>
        </Box>

        <h2>Top 5 Local Attractions:</h2>
            <ul>
                {topAttractions.map(attraction => (
                    <li key={attraction.place_id}>{attraction.name}</li>
                ))}
            </ul>
    </Box>
    );
}

export default MapComponent;