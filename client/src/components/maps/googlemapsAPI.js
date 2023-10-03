import { Loader } from "@googlemaps/js-api-loader";

export const googleMapsOperations = {
    getLoader: function(apiKey) {
        return new Loader({
            apiKey: apiKey,
            version: "weekly"
            // ...additionalOptions,
        });
    },
    loadGoogleMapsScript: function(loader) {
        return loader.load();  // Returns a Promise
    },
    initMap: function() {
        const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
        return mapInstance;
    }
}