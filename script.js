var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2
});

var width = 4000;
var height = 2000;
var bounds = [[0, 0], [width, height]];

// Base map
L.imageOverlay('img/map.png', bounds).addTo(map);
map.fitBounds(bounds);

// Panes for layering
map.createPane('trees');
map.getPane('trees').style.zIndex = 400;

map.createPane('pins');
map.getPane('pins').style.zIndex = 500;

// Size lookup (in map units now, NOT pixels)
var sizeMap = {
  1: 200,
  2: 350,
  3: 500
};

fetch('MJTrees.csv')
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.split('\n').slice(1);

    rows.forEach(row => {
      const cols = row.split(',');

      const name = cols[1];
      const latin = cols[2];
      latin.style.fontStyle = "italic";
      const x = parseFloat(cols[3]);
      const y = parseFloat(cols[4]);
      const native = cols[7];
      const edible = cols[8];
      const size = parseInt(cols[6]);

      if (!isNaN(x) && !isNaN(y)) {
        const s = sizeMap[size] || 35;

        // --- TREE IMAGE (NON-INTERACTIVE, SCALES WITH MAP) ---
        const imgBounds = [
          [y - s / 2, x - s / 2],
          [y + s / 2, x + s / 2]
        ];

        L.imageOverlay('img/tree.png', imgBounds, {
          pane: 'trees',
          interactive: false,
          opacity: .8 
        }).addTo(map);

        // --- GREY DOT (INTERACTIVE MARKER) ---
        const pin = L.circleMarker([y, x], {
          radius: 4,
          color: '#333333',
          fillColor: '#333333',
          fillOpacity: 0,
          opacity: 1,
          weight: 2,
          pane: 'pins'
        }).addTo(map);

        pin.bindPopup(`<b>${name}</b><br>${latin}</b><br>"Native: "${native}</b><br>"Edible: "${edible}`);
      }
    });
  });
