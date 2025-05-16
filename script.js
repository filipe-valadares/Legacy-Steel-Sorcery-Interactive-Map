// script.js

const map = L.map('map', {
  crs: L.CRS.Simple,
  center: [0, 0],
  zoom: -1,
  zoomSnap: 0.5,
  minZoom: -1,
  maxZoom: 5
});

let bounds = [[0, 0], [1000, 1000]];
let backgroundOverlay;
let markerLayers = {};
let devMode = false;
let timestamp = new Date().getTime();
let currentMap = null;
let mapsData = [];

const mapButtonsContainer = document.getElementById("map-buttons-container");
const layersContainer = document.getElementById("layers-container");

fetch("maps/manifest.json")
  .then(res => res.json())
  .then(data => {
    mapsData = data.maps;
    loadMapButtons();
  });

function loadMapButtons() {
  mapsData.forEach((mapData, i) => {
    const button = document.createElement("button");
    button.className = "layer-button";
    button.textContent = mapData.name;
    if (i === 0) button.classList.add("active");
    button.addEventListener("click", () => {
      document.querySelectorAll("#map-buttons-container .layer-button").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      currentMap = mapData;
      loadFloorButtons();
    });
    mapButtonsContainer.appendChild(button);
  });
  currentMap = mapsData[0];
  loadFloorButtons();
}

function loadFloorButtons() {
  layersContainer.innerHTML = "";
  currentMap.floors.forEach((floor, i) => {
    const button = document.createElement("button");
    button.className = "layer-button";
    button.textContent = floor.name;
    if (i === 0) button.classList.add("active");
    button.addEventListener("click", () => {
      document.querySelectorAll("#layers-container .layer-button").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      loadFloor(floor.name);
    });
    layersContainer.appendChild(button);
  });
  loadFloor(currentMap.floors[0].name);
}

function loadFloor(floorName) {
  // Clear old markers & categories
  for (let key in markerLayers) markerLayers[key].forEach(m => map.removeLayer(m));
  markerLayers = {};
  document.getElementById("categories-container").innerHTML = "";

  const imagePath = `maps/${currentMap.name}/floors/${floorName}.jpg`;
  const dataPath = `maps/${currentMap.name}/floors/${floorName}.json?v=${timestamp}`;

  if (backgroundOverlay) map.removeLayer(backgroundOverlay);
  backgroundOverlay = L.imageOverlay(imagePath, bounds).addTo(map);
  map.fitBounds(bounds);

  fetch(dataPath)
    .then(res => res.json())
    .then(data => loadMarkers(data))
    .catch(err => console.error("Failed to load floor JSON", err));
}

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

    var iconUrl = markerData.url ? `maps/${currentMap.name}/${markerData.url}` : `maps/${currentMap.name}/images/Icons/default.png`;

    var button = document.createElement('button');
    button.className = "marker-toggle";
    button.dataset.markerName = markerData.name;
    button.dataset.visible = "true";
    button.innerHTML = `<img src="${iconUrl}" alt="${markerData.name} icon" class="marker-icon" /><span>${markerData.name}</span>`;

    button.addEventListener('click', function () {
      var isVisible = button.dataset.visible === "true";
      button.dataset.visible = isVisible ? "false" : "true";
      button.classList.toggle("disabled", !isVisible);
      toggleMarkers(markerData.name, !isVisible);
    });

    buttonsContainer.appendChild(button);

    markerData.points.forEach(function (point) {
      addMarker(markerData, point);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const markerParam = urlParams.get('marker');
    if (markerParam) {
      filterMarkersByName(markerParam);
    }
  });
}

function addMarker(markerData, point) {
  var description = point.desc || markerData.desc;
  var iconUrl = markerData.url ? `maps/${currentMap.name}/${markerData.url}` : `maps/${currentMap.name}/images/Icons/default.png`;
  var markerIcon = L.icon({
    iconUrl: iconUrl,
    iconSize: [26, 26],
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
      ${point.image ? `<img src="maps/${currentMap.name}/${point.image}" alt="${markerData.name} image" class="popup-image" />` : ''}
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
      isVisible ? marker.addTo(map) : map.removeLayer(marker);
    });
  }
}

function filterMarkersByName(targetName) {
  for (let markerName in markerLayers) {
    const isMatch = markerName.toLowerCase() === targetName.toLowerCase();
    toggleMarkers(markerName, isMatch);

    let button = document.querySelector(`.marker-toggle[data-marker-name="${markerName}"]`);
    if (button) {
      button.dataset.visible = isMatch ? "true" : "false";
      button.classList.toggle("disabled", !isMatch);
    }
  }
}

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
  this.style.display = 'none';
  document.getElementById('mobile-mode-toggle').parentNode.style.display = 'block';
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

document.getElementById('toggle-all').addEventListener('click', function () {
  let allVisible = this.textContent.includes("Hide");
  document.querySelectorAll('.marker-toggle').forEach(button => {
    const name = button.dataset.markerName;
    button.dataset.visible = allVisible ? "false" : "true";
    button.classList.toggle("disabled", allVisible);
    toggleMarkers(name, !allVisible);
  });
  this.textContent = allVisible ? "Show All Markers" : "Hide All Markers";
  this.classList.toggle("all-on", !allVisible);
  this.classList.toggle("all-off", allVisible);
});

//add back coordinate on click
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