// File: googlemaps.js

import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import googleMapsManager from './googlemapsAPI';

function MapComponent() {
    useEffect(() => {
        googlemapsAPI.displayGoogleMaps();        
    }, []);

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
