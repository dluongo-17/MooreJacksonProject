// 1. Create the map using pixel coordinates
var map = L.map('map', {
  crs: L.CRS.Simple,   // Use simple pixel-based coordinates
  minZoom: -2
});

// 2. Define image size (replace with your map dimensions)
var width = 2000;   // width of your map.png in pixels
var height = 4000;  // height of your map.png in pixels

// 3. Define bounds for the image (top-left, bottom-right)
var bounds = [[0,0],[height, width]];

// 4. Add image overlay
L.imageOverlay('img/map.png', bounds).addTo(map);

// 5. Fit map view to the image
map.fitBounds(bounds);

// 6. Optional: Add a test marker
var tree = L.circleMarker([800,1200], { radius:8, color:'green' }).addTo(map);
tree.bindPopup("<b>Oak Tree</b><br>Planted 1995");
