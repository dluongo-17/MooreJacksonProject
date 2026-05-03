var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2
});

var width = 4000;
var height = 2000;
var bounds = [[0,0],[width, height]];

L.imageOverlay('img/map.png', bounds).addTo(map);
map.fitBounds(bounds);

var sizeMap = {
  1: 35,
  2: 60,
  3: 90
};

function makeIcon(baseSize) {
  return L.icon({
    iconUrl: 'img/tree.png',
    iconSize: [baseSize, baseSize],
    iconAnchor: [baseSize / 2, baseSize / 2],
    popupAnchor: [0, -baseSize / 2]
  });
}

fetch('MJTrees.csv')
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.split('\n').slice(1);
    const markers = [];

    rows.forEach(row => {
      const cols = row.split(',');
      const name = cols[1];
      const x = parseFloat(cols[3]);
      const y = parseFloat(cols[4]);
      const year = cols[5];
      const size = parseInt(cols[6]);

      if (!isNaN(x) && !isNaN(y)) {
        const baseSize = sizeMap[size] || 32;

        const marker = L.marker([y, x], { icon: makeIcon(baseSize) }).addTo(map);
        marker.bindPopup(`<b>${name}</b><br>Planted ${year}`);
        markers.push({ marker, baseSize });

        // Pin point on top of PNG marker
        const pin = L.circleMarker([y, x], {
          radius: 4,
          color: '#333333',
          fillColor: '#333333',
          fillOpacity: 1,
          opacity: 1,
          weight: 1
        }).addTo(map);
        pin.bindPopup(`<b>${name}</b><br>Planted ${year}`);
      }
    });

    function updateMarkerSizes() {
      const scale = map.getZoomScale(0, map.getZoom());
      markers.forEach(({ marker, baseSize }) => {
        const s = Math.round(baseSize * scale);
        marker.setIcon(makeIcon(s));
      });
    }

    map.on('zoom', updateMarkerSizes);
    updateMarkerSizes();
  });
