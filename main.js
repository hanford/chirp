const path = require('path')
const { app, BrowserWindow } = require('electron')

const startUrl = 'https://mobile.twitter.com/home'

function createWindow () {
  mainWindow = new BrowserWindow({width: 375, height: 667, vibrancy: 'light'})

  mainWindow.loadURL(startUrl)

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
