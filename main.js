const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

function createWindow () {
    // Create the browser window.
    let mainWin = new BrowserWindow({
      resizable: false,
      height: 720,
      width: 1280,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // and load the index.html of the app.
    mainWin.loadFile('index.html');
    mainWin.webContents.openDevTools();
    ipc.on('create-edit-window', function() {
      let editMarkerWindow = new BrowserWindow({
        resizable: false,
        height: 300,
        width: 400,
        webPreferences: {
          nodeIntegration : true
        }
      }
      )
      editMarkerWindow.loadFile('editMarker.html');
      editMarkerWindow.removeMenu();
      editMarkerWindow.webContents.openDevTools();
      editMarkerWindow.on('close', function() {
        mainWin.webContents.send('edit-window-close');
      });
    })
    ipc.on('change-name', (event, args) => {
      mainWin.webContents.send('change-name',args);
    })
    /*ipc.on('edit-window-close', function() {
      console.log("Closing time...");
      mainWin.webContents.send('edit-window-close');
    });*/
  }
  
  app.whenReady().then(createWindow)
