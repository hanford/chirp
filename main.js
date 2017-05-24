const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

function createWindow() {
    mainWindow = new BrowserWindow({ width: 375, height: 667, vibrancy: 'light' })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.openDevTools();
    mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})