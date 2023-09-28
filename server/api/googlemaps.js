// keep this here for now
function initMap() {
    // The location of the center of the map
    var center = { lat: -34.397, lng: 150.644 };
    // The map, centered at the specified location
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: center,
    });
  }