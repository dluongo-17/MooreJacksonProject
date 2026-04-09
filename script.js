// create map with simple CRS (no lat/long)
var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2
});

// image dimensions (IMPORTANT)
var width = 3000;
var height = 2000;

// define bounds (top-left, bottom-right)
var bounds = [[0, 0], [height, width]];

// add image
L.imageOverlay('img/map.png', bounds).addTo(map);

// fit map to image
map.fitBounds(bounds);
