import { Loader } from "@googlemaps/js-api-loader";

let defaultLat, defaultLong; // global variables to store the vacation's locality lat and long
let loaderInstance = null;
let directionsService, directionsRenderer;
let mapInstance, infoWindow;    // global variables to store mapInstance and infoWindow
let markers = [];    // store the instance of the map, information window, initialize markers array
export const googleMapsOperations = {
    displayGoogleMaps: function() {
        // Fetch the Google Maps API key from the server.
        fetch('http://localhost:3001/api/googlemapsapikey')
            .then(response => response.json())
            .then(data => {
                return this.getLoaderAndLoadGoogleMapsScript(data.apiKey)   
            })
            .then(() => {
                // Initialize the map and assign it to mapInstance
                mapInstance = googleMapsOperations.initalizeMap();
            })
            .then(() => {
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
                });
                googleMapsOperations.findPlaces("taco bell in detroit");
            })
            .catch(error => {
                console.error("Error:", error);
            });
    },
    getLoaderAndLoadGoogleMapsScript: function(apiKey) {
        if (!loaderInstance){
            loaderInstance = new Loader({
                apiKey: apiKey,
                version: "weekly",
                libraries: ["places"]
                // ...additionalOptions,
            });
        }
        return loaderInstance.load();
    },
    addMarker: function(lat, lng) {
        const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map: mapInstance,
            draggable: true, // Allow the marker to be draggable
        });

        // Add a click event listener to open an info window when the marker is clicked
        marker.addListener("click", () => {
            const infoWindow = new window.google.maps.InfoWindow({
                content: `Marker Location: ${lat}, ${lng}`,
            });
            infoWindow.open(mapInstance, marker);
        });
        
        // Add the marker to the markers array 
        markers.push(marker);
    },
    initalizeMap: async function(defaultLocalityName) {    
        try {
            const geocoder = new window.google.maps.Geocoder();// Initialize the geocoder
            const geocodeResult = await geocoder.geocode({ address: defaultLocalityName });// Geocode the location name to get latitude and longitude
            const location = geocodeResult.results[0].geometry.location;
    
            // Initialize the map with the geocoded location as the center
            defaultLat = location.lat();
            defaultLong = location.lng();
            mapInstance = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: defaultLat, lng: defaultLong },
                zoom: 12,
            });
    
            return mapInstance; // Return the created map instance
        } catch (error) {
            mapInstance = new window.google.maps.Map(document.getElementById("map"), {  //initializes the map
                center: { lat: 40.730610, lng: -73.935242 },    // if defaultLocalityName parameter doesn't work, google maps will center at New york city
                zoom: 12,
            });
            return mapInstance; // returns the created map instance
        }
    },
    handleLocationError: function(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation   // sets a corresponding error message to the infoWindow and then opens it on the map
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation.",
        );
        infoWindow.open(mapInstance);
    },
    showCurrentLocation: function() {
        infoWindow = new window.google.maps.InfoWindow();   //initialize the infoWindow instance
        const locationButton = document.createElement("button");    //create new button element
        locationButton.textContent = "Pan to Current Location";
        locationButton.classList.add("custom-map-control-button");
        //button is then added to the top center position of the map controls
        mapInstance.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
        locationButton.addEventListener("click", () => {    //event listener when button is clicked
        // Try HTML5 geolocation.
        if (navigator.geolocation) {    
            navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(mapInstance);
            mapInstance.setCenter(pos);
            },
            () => {
            this.handleLocationError(true, infoWindow, mapInstance.getCenter());
            }
        );
        } else 
            // if browser doesn't support Geolocation
            this.handleLocationError(false, infoWindow, mapInstance.getCenter());
        });
    },
    searchLocation: function(searchInput) {
        // check if there is already an initialized mapInstance
        if (!mapInstance) {
            console.error('Map has not been initialized.');
            return;
        }

        const request = {
            query: searchInput
        }

        const placesService = new window.google.maps.places.PlacesService(mapInstance);
        placesService.textSearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                // Clear out the old markers.
                markers.forEach(marker => marker.setMap(null));
                markers = [];

                const place = results[0];
                mapInstance.setCenter(place.geometry.location);
                googleMapsOperations.addMarker(place.geometry.location.lat(), place.geometry.location.lng());
            } else {
                console.error('Place not found:', status);
            }
        });
    },
    findPlaces: async function(query) {
        // Make sure the mapInstance is already initialized before calling this function.
        if (!mapInstance) {
            console.error('Map has not been initialized.');
            return;
        }

        const { places } = window.google.maps;
        const request = {
            query: query, // Example query
            fields: ['name', 'geometry', 'formatted_address'], // Specify the return fields
            openNow: true
        };

        const service = new places.PlacesService(mapInstance);
        
        service.textSearch(request, (results, status) => {
            if (status === places.PlacesServiceStatus.OK && results) {
                // Clear out the old markers.
                markers.forEach(marker => marker.setMap(null));
                markers = [];

                // Create a bounds object to fit all search results.
                const bounds = new window.google.maps.LatLngBounds();

                results.forEach(place => {
                    if (!place.geometry || !place.geometry.location) return;

                    // Define the content for the info window
                    const contentString = `
                    <div>
                        <h3>${place.name}</h3>
                        <p>${place.formatted_address}</p>
                    </div>
                `;

                // Create an info window for each marker
                const infoWindow = new window.google.maps.InfoWindow({
                    content: contentString
                });

                // Create a marker for each place found
                const marker = new window.google.maps.Marker({
                    map: mapInstance,
                    title: place.name,
                    position: place.geometry.location
                });

                    // Add a click listener to the marker to open the info window
                marker.addListener('click', () => {
                    // Close previously opened info window if any
                    if (window.prevInfoWindow) {
                        window.prevInfoWindow.close();
                    }
                    infoWindow.open({
                        anchor: marker,
                        map: mapInstance,
                        shouldFocus: false
                    });
                    // Keep track of the open info window
                    window.prevInfoWindow = infoWindow;
                });

                // Add the marker to the array of markers
                markers.push(marker);

                // Extend the bounds to include the location of this place
                bounds.extend(place.geometry.location);

                });

                // Adjust the map bounds to show all markers
                mapInstance.fitBounds(bounds);

            } else {
                console.error('Place not found:', status);
            }
        });
    },
    calculateAndDisplayRoute: function(start, end)
    {
        // check if there is already an initialized mapInstance
        if (!mapInstance) {
            console.error('Map has not been initialized.');
            return;
        }
        //check if directionsService is initialized
        if (!directionsService) 
            directionsService = new window.google.maps.DirectionsService();
        //check if directionsRenderer is initialized
        if (!directionsRenderer) 
        {
            directionsRenderer = new window.google.maps.DirectionsRenderer({    //create a new directionsRenderer instance
                map: mapInstance    //associate it with the current active displayed map
            });
        }
        directionsService.route({   //make request to fetch directions
            origin: start,  //starting location
            destination: end,   //end location
            travelMode: window.google.maps.TravelMode.DRIVING,  //transportation type
        }, (response, status) => {      //callback function to handle result of route request
            if (status === "OK") { 
                directionsRenderer.setDirections(response);
                const routeLeg = response.routes[0].legs[0];    //extract distance and time from response
                const distance = routeLeg.distance.text;
                const duration = routeLeg.duration.text;  
                document.getElementById("distance").textContent = `Distance: ${distance} `;  //Display distance
                document.getElementById("duration").textContent = `Duration: ${duration}`;  //display duration
            } else {
                window.alert("Directions request failed due to " + status);
            }
        });
    },

    findTopAttractions: async function(locality) {
        if (!mapInstance) {
          console.error('Map has not been initialized.');
          return Promise.reject('Map not initialized');
        }
      
        const service = new window.google.maps.places.PlacesService(mapInstance);
        const request = {
          location: mapInstance.getCenter(),
          radius: '5000',
          type: ['tourist_attraction'], // Adjust this type based on the specific needs
          rankBy: window.google.maps.places.RankBy.PROMINENCE,
        };
      
        return new Promise((resolve, reject) => {
          service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              resolve(results.slice(0, 5)); // Return only the top 5 attractions
            } else {
              console.error('Error fetching top attractions:', status);
              reject(status);
            }
          });
        });
      }
      
}