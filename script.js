
var map = L.map('map', {
  crs: L.CRS.Simple,
  center: [0, 0],
  zoom: 1,
});
var bounds = [[0, 0], [1000, 1000]];
L.imageOverlay('mapBakcgroundNew.jpg', bounds).addTo(map);
map.fitBounds(bounds);

var markerLayers = {};

map.on('click', function (event) {
  var lat = event.latlng.lat;
  var lng = event.latlng.lng;

  var newMarkerData = {
    category: 'New Category',
    name: 'New Marker ' + Date.now(),
    points: [
      {
        x: lng + 7,
        y: lat,
      }
    ]
  };

  console.log(`{ "x": ${lng}, "y": ${lat} }`);

});


fetch('markers.json')
  .then(response => response.json())
  .then(data => {
    loadMarkers(data);
  })
  .catch(error => console.error('Error loading markers.json:', error));


function loadMarkers(data) {

  data.markers.forEach(function (markerData) {
    var categoriesContainer = document.getElementById('categories-container');


    var categorySection = document.getElementById(markerData.category);
    if (!categorySection) {
      categorySection = document.createElement('div');
      categorySection.id = markerData.category;
      categorySection.classList.add('category-section');


      var categoryTitle = document.createElement('h4');
      categoryTitle.textContent = markerData.category;
      categorySection.appendChild(categoryTitle);


      var buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('marker-buttons');
      categorySection.appendChild(buttonsContainer);

      categoriesContainer.appendChild(categorySection);
    }


    var buttonsContainer = categorySection.querySelector('.marker-buttons');


    var iconUrl = markerData.url || "images/Icons/default.png";


    var button = document.createElement('button');
    button.className = "marker-toggle";
    button.dataset.markerName = markerData.name;
    button.dataset.visible = "true";
    button.innerHTML = `<img src="${iconUrl}" alt="${markerData.name} icon" class="marker-icon" /><span>${markerData.name}</span>`;

    button.addEventListener('click', function () {
      var isVisible = button.dataset.visible === "true";
      if (isVisible) {

        button.dataset.visible = "false";
        button.classList.add("disabled");
        toggleMarkers(markerData.name, false);
      } else {

        button.dataset.visible = "true";
        button.classList.remove("disabled");
        toggleMarkers(markerData.name, true);
      }
    });

    buttonsContainer.appendChild(button);


    markerData.points.forEach(function (point) {
      addMarker(markerData, point);
    });
  });
}


function addMarker(markerData, point) {

  var description = point.desc || markerData.desc;


  var iconUrl = markerData.url || "images/Icons/default.png";
  var markerIcon = L.icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

  var marker = L.marker([point.y, point.x], {
    icon: markerIcon
  }).addTo(map);


  var popupContent = `
    <div class="custom-popup">
      <h3>${markerData.name}</h3>
      <p>${description}</p>
      ${point.image ? `<img src="${point.image}" alt="${markerData.name} image" class="popup-image" />` : ''}
      <p class="popup-coords">Coords: (${point.x.toFixed(2)}, ${point.y.toFixed(2)})</p>
    </div>
  `;

  marker.bindPopup(popupContent);

  if (!markerLayers[markerData.name]) {
    markerLayers[markerData.name] = [];
  }
  markerLayers[markerData.name].push(marker);
}


function toggleMarkers(name, isVisible) {
  var markers = markerLayers[name];
  if (markers) {
    markers.forEach(function (marker) {
      if (isVisible) {
        marker.addTo(map);
      } else {
        map.removeLayer(marker);
      }
    });
  }
}


var allMarkersVisible = true;

document.getElementById('toggle-all').addEventListener('click', function () {
  var buttons = document.querySelectorAll('.marker-toggle');


  allMarkersVisible = !allMarkersVisible;


  buttons.forEach(function (button) {
    var markerName = button.dataset.markerName;
    if (allMarkersVisible) {
      button.dataset.visible = "true";
      button.classList.remove("disabled");
      toggleMarkers(markerName, true);
    } else {
      button.dataset.visible = "false";
      button.classList.add("disabled");
      toggleMarkers(markerName, false);
    }
  });


  var toggleAllBtn = document.getElementById('toggle-all');
  if (allMarkersVisible) {
    toggleAllBtn.classList.add("all-on");
    toggleAllBtn.classList.remove("all-off");
  } else {
    toggleAllBtn.classList.add("all-off");
    toggleAllBtn.classList.remove("all-on");
  }
});




document.getElementById('toggle-all').addEventListener('click', function () {
  var buttons = document.querySelectorAll('.marker-toggle');
  var allVisible = true;


  buttons.forEach(function (button) {
    if (button.dataset.visible === "false") {
      allVisible = false;
    }
  });


  buttons.forEach(function (button) {
    var markerName = button.dataset.markerName;
    if (allVisible) {
      button.dataset.visible = "false";
      button.classList.add("disabled");
      toggleMarkers(markerName, false);
    } else {
      button.dataset.visible = "true";
      button.classList.remove("disabled");
      toggleMarkers(markerName, true);
    }
  });
});
