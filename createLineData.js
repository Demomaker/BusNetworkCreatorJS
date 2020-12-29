var electron = require('electron');

function createOption(selectObject, popupContent, indexValue) {
    var option = document.createElement("option");
    option.text = popupContent;
    option.value = indexValue;
    selectObject.add(option);
}

function onPageLoad() {
    var x = document.getElementById('markers');
    var markerNames = [];
    electron.ipcRenderer.on('got-markers', (event, args) => {
        markerNames = args;
        for(i = 0; i < markerNames.length; i++) {
            console.log(markerNames[i]);
            createOption(x, markerNames[i], i);
        }
    });
    electron.ipcRenderer.send('get-markers');
}

function updateOtherMarkerIndex() {
    electron.ipcRenderer.send('save-marker-index', document.getElementById('markers').value);
}
window.onload = onPageLoad;
document.getElementById('markers').onchange = updateOtherMarkerIndex;