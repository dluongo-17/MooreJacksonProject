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

// 6. Size lookup — adjust pixel values to taste
var sizeMap = {
  1: 24,
  2: 40,
  3: 56
};

// 7. Load CSV and place markers
fetch('MJTrees.csv')
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.split('\n').slice(1);
    rows.forEach(row => {
      const cols = row.split(',');
      const name = cols[1];
      const x = parseFloat(cols[3]);
      const y = parseFloat(cols[4]);
      const year = cols[5];
      const size = parseInt(cols[6]); // 👈 adjust index to match your CSV column

      if (!isNaN(x) && !isNaN(y)) {
        const iconSize = sizeMap[size] || 32; // fallback if size is missing/invalid

        const customIcon = L.icon({
          iconUrl: 'img/tree.png',       // 👈 path to your PNG
          iconSize: [iconSize, iconSize],  // square icon scaled by size
          iconAnchor: [iconSize / 2, iconSize / 2], // centered on the point
          popupAnchor: [0, -iconSize / 2]  // popup appears above the icon
        });

        var marker = L.marker([y, x], { icon: customIcon }).addTo(map);
        marker.bindPopup(`<b>${name}</b><br>Planted ${year}`);
      }
    });
  });
