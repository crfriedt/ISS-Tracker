// Map
let mymap = L.map('mapid').setView([0,0], 1);

// Leaflet setup
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    zoomControl: false,
    id: 'mapbox/streets-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3BpZWtpbGxzIiwiYSI6ImNraXc0bWs2OTBhY20yeHBhYTIzNGJuMmwifQ.RDLFhjvJV0u8WMx-FIm7Rg'


}).addTo(mymap);

function getStationLocation(e){
  const xhr = new XMLHttpRequest();

  xhr.open('GET','http://api.open-notify.org/iss-now.json', true);

  xhr.onload = function() {
    if(this.status === 200){
      let parsedLocation = JSON.parse(this.responseText);
      let longitude = parsedLocation.iss_position.longitude;
      let latitude = parsedLocation.iss_position.latitude;
      console.log(latitude,longitude);

      // Marker
      let marker = L.marker([latitude,longitude]).addTo(mymap);
      let htmlLon = document.getElementById('tableLon');
      let htmlLat = document.getElementById('tableLat');
      htmlLon.innerHTML = longitude;
      htmlLat.innerHTML = latitude;


      setTimeout(getStationLocation, 5000);
     } else {
       console.log("ERROR: " + response.ERROR);
     }


  }

  xhr.send();
}

getStationLocation();

