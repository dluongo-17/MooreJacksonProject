// 1. Create the map using pixel coordinates
var map = L.map('map', {
  crs: L.CRS.Simple,   // Use simple pixel-based coordinates
  minZoom: -2
});

// 2. Define image size (replace with your map dimensions)
var width = 4000;   // width of your map.png in pixels
var height = 2000;  // height of your map.png in pixels

// 3. Define bounds for the image (top-left, bottom-right)
var bounds = [[0,0],[width, height]];

// 4. Add image overlay
L.imageOverlay('img/map.png', bounds).addTo(map);

// 5. Fit map view to the image
map.fitBounds(bounds);

// 6. Optional: Add a test marker
fetch('MJTrees.csv')
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.split('\n').slice(1); // skip header

    rows.forEach(row => {
      const cols = row.split(',');

      const name = cols[0];
      const x = parseFloat(cols[1]);
      const y = parseFloat(cols[2]);
      const year = cols[3];

      if (!isNaN(x) && !isNaN(y)) {
        var marker = L.circleMarker([y, x], {
          radius: 8,
          color: 'green'
        }).addTo(map);

        marker.bindPopup(`<b>${name}</b><br>Planted ${year}`);
      }
    });
  });
