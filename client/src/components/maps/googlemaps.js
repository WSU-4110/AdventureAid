import React, { useContext, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { googleMapsOperations } from './googlemapsAPI';

function MapComponent({searchInput}) {

    const mapInstanceRef = useRef(null);

    useEffect(() => {
        googleMapsOperations.displayGoogleMaps();   
    }, []);

    useEffect(() => {
        // This effect runs when searchInput changes
        if (searchInput && mapInstanceRef.current) {
            googleMapsOperations.searchLocation(searchInput);
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