var electron = require('electron');
function rename() {
    console.log("Renaming...");
    electron.ipcRenderer.send('change-name', document.getElementById("edit_marker").value);
}
document.getElementById("edit_marker").onchange = rename;