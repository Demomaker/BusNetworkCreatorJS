const electron = require('electron');
const accessToken = require('./accessToken.js');
var {webContents} = electron;
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
var lastlatlong;
var lastMarker;
var editingMarker;
var lineMarker;
var mousePosX = 0;
var mousePosY = 0;
var markers = [];
var newMarkerName = "";
var ipc = electron.ipcRenderer;

function createMarker(coords) {
    myMarker = L.marker(coords, {
        draggable: false
    });
    myMarker.on("contextmenu", function (event) {
        var contextElement = document.getElementById("marker-context-menu");
        contextElement.style.top = mousePosY + "px";
        contextElement.style.left = mousePosX + "px";
        contextElement.classList.add("active");
        lastMarker = myMarker;
    });
    window.addEventListener("click", function () {
        document.getElementById("marker-context-menu").classList.remove("active");
    });
    mymap.addLayer(myMarker);
    myMarker.addTo(mymap);
    markers.push(myMarker);
}

function createNewMarker() {
    createMarker(lastlatlong);
}

function removeCurrentMarker() {
    mymap.removeLayer(lastMarker);
    markers.splice(markers.indexOf(lastMarker), 1);
}

function renameMarker(name) {
    newMarkerName = name;
    console.log("new name : " + name);
}

function createEditMarkerWindow() {
    electron.ipcRenderer.send('create-edit-window');
}

function onEditMarkerWindowClose() {
    editingMarker.unbindPopup();
    editingMarker.bindPopup(newMarkerName, {
        closeButton: true
    });
    console.log("New Marker Name : " + newMarkerName);
}

function editMarker() {
    editingMarker = lastMarker;
    createEditMarkerWindow();
}

function createLine() {}

function createMapAt(posX, posY, posZ) {
    if (mymap != undefined) {
        mymap.remove();
    }
    mymap = L.map('mapid').setView([posX, posY], posZ);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: accessToken
    }).addTo(mymap);

    mymap.on("contextmenu", function (event) {
        var contextElement = document.getElementById("map-context-menu");
        contextElement.style.top = mousePosY + "px";
        contextElement.style.left = mousePosX + "px";
        contextElement.classList.add("active");
        lastlatlong = event.latlng;
    });
    window.addEventListener("click", function () {
        document.getElementById("map-context-menu").classList.remove("active");
    });

}
/*
var marker = L.marker([51.5,-0.09]).addTo(mymap);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();*/
function setMapLink() {
    var mapLink = document.getElementById('mapLink').value;
    var mapLinkParts = mapLink.split('=')[1];
    var mapZ = mapLinkParts.split('/')[0];
    var mapX = mapLinkParts.split('/')[1];
    var mapY = mapLinkParts.split('/')[2];
    createMapAt(mapX, mapY, mapZ);
}


function AssignButtonClicks() {
    document.getElementById("mapLinkButton").onclick = setMapLink;
    document.getElementById("create-marker").onclick = createNewMarker;
    document.getElementById("remove-marker").onclick = removeCurrentMarker;
    document.getElementById("edit-marker").onclick = editMarker;
    document.getElementById("create-line").onclick = createLine;
    window.addEventListener("mousemove", function (event) {
        mousePosX = event.offsetX;
        mousePosY = event.offsetY;
    });
    ipc.on("change-name", (event, args) => {
        renameMarker(args);
    })
    ipc.on("edit-window-close", function() {
        console.log("Yeah, now it's closing time");
        onEditMarkerWindowClose();
    })
}

AssignButtonClicks();
createMapAt(0, 0, 10);