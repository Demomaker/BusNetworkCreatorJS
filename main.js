const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({
      height: 640,
      width: 480,
      webPreferences: {
        nodeIntegration: true
      }
    })

    // and load the index.html of the app.
    win.loadFile('index.html');
    win.webContents.openDevTools();
    win.removeMenu();
  }
  
  app.whenReady().then(createWindow)
