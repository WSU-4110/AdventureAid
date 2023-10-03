import React, { useState, useEffect } from 'react';
import { googleMapsOperations } from './googlemapsAPI';

function MapComponent() {

    useEffect(() => {   // funtionality in the front end components
        const loader = googleMapsOperations.getLoader("insert api key");
        googleMapsOperations.loadGoogleMapsScript(loader)
            .then(() => {
                const mapInstance = googleMapsOperations.initMap();
            })
            .catch(error => {
                console.error("Error loading Google Maps:", error);
            });
    }, []);

    return <div id="map" style={{ width: '100%', height: '700px' }}></div>;
}

export default MapComponent;