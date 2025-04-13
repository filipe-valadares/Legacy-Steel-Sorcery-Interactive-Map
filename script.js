var map = L.map('map', {
  crs: L.CRS.Simple,
  center: [0, 0],
  zoom: 1,
});
var bounds = [[0, 0], [1000, 1000]];

// Remove or replace the duplicate background overlay if not needed:
const layers = [
  { file: "Main Floor.json", background: "Main Floor.jpg" },
  { file: "-1 Floor.json", background: "-1 floor.jpg" }
];

var backgroundOverlay = L.imageOverlay(layers[0].background, bounds).addTo(map);
map.fitBounds(bounds);

var markerLayers = {};

let devMode = false;
let mobileMode = false;

document.getElementById("dev-mode-toggle").addEventListener("click", function () {
  devMode = !devMode;
  this.textContent = devMode ? "Dev Mode: ON" : "Dev Mode: OFF";
  this.classList.toggle("active", devMode);
});

document.getElementById("mobile-mode-toggle").addEventListener("click", function () {
 	document.getElementById('show-menu').style.display = 'block';
	this.parentNode.style.display = 'none';
	document.getElementById("map").style.width = '100%';
	document.getElementById("map").style.margin = '0';
});

document.getElementById("show-menu").addEventListener("click", function () {
 	document.getElementById('show-menu').style.display = 'none';
	document.getElementById('mobile-mode-toggle').parentNode.style.display = 'block';
});

function loadLayerButtons() {
  const container = document.getElementById('layers-container');
  container.innerHTML = ''; // clear any existing buttons
  layers.forEach(layer => {
    const layerName = layer.file.replace('.json', '');
    const button = document.createElement('button');
    button.className = 'layer-button';
    button.textContent = layerName;
    button.addEventListener('click', () => {
      // Mark this button as active and clear active state from others
      document.querySelectorAll('.layer-button').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
    
      // Clear current markers
      for (let key in markerLayers) {
        markerLayers[key].forEach(marker => map.removeLayer(marker));
      }
      markerLayers = {}; // reset markers
    
      // Clear filters (categories container)
      document.getElementById('categories-container').innerHTML = '';
    
      // Update map background
      if (backgroundOverlay) {
        map.removeLayer(backgroundOverlay);
      }
      backgroundOverlay = L.imageOverlay(layer.background, bounds).addTo(map);
    
      // Fetch the selected layer's JSON and load markers
      fetch(layer.file + '?v=' + timestamp)
        .then(response => response.json())
        .then(data => {
          loadMarkers(data);
        })
        .catch(error => console.error('Error loading ' + layer.file, error));
    });
    container.appendChild(button);
  });
}

map.on("click", function (event) {
  if (!devMode) return; // Only allow copying if Dev Mode is enabled

  var lat = event.latlng.lat;
  var lng = event.latlng.lng;

  var coordinateText = `{"x": ${lng}, "y": ${lat}}`;
  console.log(coordinateText);

  navigator.clipboard.writeText(coordinateText).then(() => {
    console.log("Copied to clipboard:", coordinateText);
  }).catch(err => {
    console.error("Failed to copy:", err);
  });
});



document.getElementById('search-bar').addEventListener('input', function(e) {
  var searchText = e.target.value.toLowerCase();
  var buttons = document.querySelectorAll('.marker-toggle');
  buttons.forEach(function(button) {
    var markerName = button.dataset.markerName.toLowerCase();
    var categoryName = button.closest('.category-section').id.toLowerCase(); 
    if (markerName.includes(searchText) || categoryName.includes(searchText)) {
      button.style.visibility = 'visible';
      button.style.height = 'auto';
    } else {
      button.style.visibility = 'hidden';
      button.style.height = '0';
    }
  });
});


// Define a timestamp for this session
const timestamp = new Date().getTime();

// Fetch markers.json with a no-cache parameter
fetch('markers.json?v=' + timestamp)
  .then(response => response.json())
  .then(data => {
    loadMarkers(data);
    const urlParams = new URLSearchParams(window.location.search);
    const markerParam = urlParams.get('marker');
    if (markerParam) {
      let markerFound = false;
      for (let markerName in markerLayers) {
        if (markerName.toLowerCase() === markerParam.toLowerCase()) {
          markerFound = true;
          break;
        }
      }
      if (markerFound) {
        filterMarkersByName(markerParam);
      }
    }
  })
  .catch(error => console.error('Error loading markers.json:', error));


function filterMarkersByName(targetName) {
  for (let markerName in markerLayers) {
    const isMatch = markerName.toLowerCase() === targetName.toLowerCase();
    toggleMarkers(markerName, isMatch);
    
    let button = document.querySelector(`.marker-toggle[data-marker-name="${markerName}"]`);
    if (button) {
      button.dataset.visible = isMatch ? "true" : "false";
      if (isMatch) {
        button.classList.remove("disabled");
      } else {
        button.classList.add("disabled");
      }
    }
  }
}

loadLayerButtons();

// Optionally, load the first layer by default if desired:
fetch(layers[0].file + '?v=' + timestamp)
  .then(response => response.json())
  .then(data => {
    loadMarkers(data);
  })
  .catch(error => console.error('Error loading ' + layers[0].file, error));

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
      <p class="popup-coords">Coordinates: (${point.x.toFixed(2)}, ${point.y.toFixed(2)})</p>
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
  allMarkersVisible = !allMarkersVisible;
  
  var buttons = document.querySelectorAll('.marker-toggle');
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
    toggleAllBtn.textContent = "Hide All Markers";
    toggleAllBtn.classList.add("all-on");
    toggleAllBtn.classList.remove("all-off");
  } else {
    toggleAllBtn.textContent = "Show All Markers";
    toggleAllBtn.classList.add("all-off");
    toggleAllBtn.classList.remove("all-on");
  }
});