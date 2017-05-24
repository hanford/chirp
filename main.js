const path = require('path')
const {app, BrowserWindow} = require('electron')

function createWindow() {
    mainWindow = new BrowserWindow({ width: 375, height: 667, vibrancy: 'light' })

    mainWindow.loadURL(path.join(__dirname, "index.html"))

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