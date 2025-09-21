let map;
const mockSpots = [
  { lat: 12.9716, lng: 77.5946, type: 'formal', size: 'car', price: '₹30/hr' },
  { lat: 12.973, lng: 77.595, type: 'informal', size: 'bike', price: 'Free' },
  { lat: 12.970, lng: 77.596, type: 'formal', size: 'truck', price: '₹50/hr' },
];

function initMap() {
  const center = { lat: 12.9716, lng: 77.5946 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center,
  });

  document.getElementById("search-btn").addEventListener("click", () => {
    const vehicleSize = document.getElementById("vehicle-size").value;
    showFilteredSpots(vehicleSize);
  });

  // Autocomplete (mock for now)
  new google.maps.places.Autocomplete(document.getElementById("location-input"));

  showFilteredSpots('car');
}

function showFilteredSpots(size) {
  mockSpots.forEach(spot => {
    if (spot.size === size) {
      const marker = new google.maps.Marker({
        position: { lat: spot.lat, lng: spot.lng },
        map,
        title: `${spot.type} Parking`,
      });

      const content = `
        <div>
          <strong>${spot.type === 'formal' ? 'Garage' : 'Street'} Spot</strong><br/>
          Price: ${spot.price}<br/>
          ETA: ~5 mins<br/>
          <button onclick="window.alert('Navigation feature coming soon!')">Navigate</button>
        </div>
      `;

      const infowindow = new google.maps.InfoWindow({ content });
      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
    }
  });
}

document.getElementById("toggle-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});
