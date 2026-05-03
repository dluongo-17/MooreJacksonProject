// 1. Create the map using pixel coordinates
var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2
});

// 2. Define image size
var width = 4000;
var height = 2000;

// 3. Define bounds
var bounds = [[0,0],[width, height]];

// 4. Add image overlay
L.imageOverlay('img/map.png', bounds).addTo(map);

// 5. Fit map view to the image
map.fitBounds(bounds);

// 6. Size lookup
var sizeMap = {
  1: 35,
  2: 50,
  3: 70
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
      const size = parseInt(cols[6]);

      if (!isNaN(x) && !isNaN(y)) {
        const iconSize = sizeMap[size] || 32;

        var anchor = L.circleMarker([y, x], { radius: 0, opacity: 0, fillOpacity: 0 }).addTo(map);

        anchor.bindTooltip(
          `<img src="img/tree.png" style="width:${iconSize}px; height:${iconSize}px; opacity:0.7;">`,
          {
            permanent: true,
            direction: 'center',
            className: 'marker-tooltip'
          }
        );

        anchor.bindPopup(`<b>${name}</b><br>Planted ${year}`);
      }
    });
  });
