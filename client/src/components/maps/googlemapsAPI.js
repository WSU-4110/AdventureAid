// File: googleMapsManager.js

import { Loader } from "@googlemaps/js-api-loader";

class GoogleMapsManager {
    constructor() {
        if (!GoogleMapsManager.instance) {
            this.mapInstance = null;
            this.directionsService = null;
            this.directionsRenderer = null;
            this.markers = [];
            GoogleMapsManager.instance = this;
        }
        return GoogleMapsManager.instance;
    }

    displayGoogleMaps() {
        fetch('http://localhost:3001/api/googlemapsapikey')
            .then(response => response.json())
            .then(data => {
                const loader = this.getLoader(data.apiKey);
                return this.loadGoogleMapsScript(loader);   
            })
            .then(() => {
                this.initializeMap();
                this.showCurrentLocation();
                // additional logic for handling UI elements like buttons can go here...
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    getLoader(apiKey) {
        return new Loader({
            apiKey: apiKey,
            version: "weekly",
            libraries: ["places"]
        });
    }

    loadGoogleMapsScript(loader) {
        return loader.load();
    }

    initializeMap() {
        this.mapInstance = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 40.730610, lng: -73.935242 },
            zoom: 12,
        });
    }

    addMarker(lat, lng) {
        const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map: this.mapInstance,
            draggable: true,
        });

        marker.addListener("click", () => {
            const infoWindow = new window.google.maps.InfoWindow({
                content: `Marker Location: ${lat}, ${lng}`,
            });
            infoWindow.open(this.mapInstance, marker);
        });

        this.markers.push(marker);
    }

    showCurrentLocation() {
        const infoWindow = new window.google.maps.InfoWindow();
        const locationButton = document.createElement("button");
        locationButton.textContent = "Pan to Current Location";
        locationButton.classList.add("custom-map-control-button");
        this.mapInstance.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
        
        locationButton.addEventListener("click", () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(this.mapInstance);
                    this.mapInstance.setCenter(pos);
                },
                () => {
                    this.handleLocationError(true, infoWindow, this.mapInstance.getCenter());
                });
            } else {
                this.handleLocationError(false, infoWindow, this.mapInstance.getCenter());
            }
        });
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(this.mapInstance);
    }

    searchLocation(searchInput) {
        const placesService = new window.google.maps.places.PlacesService(this.mapInstance);
        placesService.textSearch({ query: searchInput }, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const place = results[0];
                this.mapInstance.setCenter(place.geometry.location);
                this.addMarker(place.geometry.location.lat(), place.geometry.location.lng());
            } else {
                console.error('Place not found:', status);
            }
        });
    }

    calculateAndDisplayRoute(start, end) {
        if (!this.directionsService)
            this.directionsService = new window.google.maps.DirectionsService();
        if (!this.directionsRenderer) {
            this.directionsRenderer = new window.google.maps.DirectionsRenderer({
                map: this.mapInstance
            });
        }
        this.directionsService.route({
            origin: start,
            destination: end,
            travelMode: window.google.maps.TravelMode.DRIVING,
        }, (response, status) => {
            if (status === "OK") {
                this.directionsRenderer.setDirections(response);
                const routeLeg = response.routes[0].legs[0];
                const distance = routeLeg.distance.text;
                const duration = routeLeg.duration.text;
                document.getElementById("distance").textContent = `Distance: ${distance} `;
                document.getElementById("duration").textContent = `Duration: ${duration}`;
            } else {
                window.alert("Directions request failed due to " + status);
            }
        });
    }
}

const instance = new GoogleMapsManager();
Object.freeze(instance);

export default instance;
