const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow(
        {
            width: 1280, height: 960, darkTheme: true,
            title:"Complete Api Tester",
            webPreferences: {
                enableRemoteModule: true, contextIsolation: false, nodeIntegration: true, nodeIntegrationInWorker: true
            }
        }
    );
    mainWindow.center();

    process.env.NODE_MODULE !== "Development" &&
        mainWindow.removeMenu();

    process.env.NODE_MODULE === "Development" ?
        mainWindow.loadURL("http://localhost:3000")
        :
        mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)


    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});

