const {app, BrowserWindow, Menu, ipcMain, ipcRenderer, nativeImage} = require('electron')
const path = require('path')
const url = require('url')
const Analytics = require('electron-google-analytics')
new Analytics.default('UA-45226320-3')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 667,
    icon: path.join(__dirname, './icon/icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
      devTools: false,
      nativeWindowOpen: true // Default changes to true in Electron 15
    }
  })
  mainWindow.loadFile('index.html')
}

app.commandLine.appendSwitch('disable-features', 'CrossOriginOpenerPolicy') // Twitter is blank in webview without this
app.whenReady().then(() => {createWindow()})
app.on('window-all-closed', () => {if (process.platform !== 'darwin') {app.quit()}})
app.on('activate', () => {if (mainWindow === null) {createWindow()}})

function chirpMenu () {
  const topBarMenu = [{
    label: 'Chirp',
    submenu: [{
      label: 'About',
      click(){
        shell.openExternal('https://jackhanford.com/chirp')
      }
    }, {
      label: 'Get the latest update',
      click(){
        shell.openExternal('https://github.com/hanford/chirp/releases')
      }
    }, {
      label: 'Submit a bug report',
      click(){
        shell.openExternal('https://github.com/hanford/chirp/issues')
      }
    }, {
      role: 'quit'
    }]
  }, {
    label: 'Edit',
    submenu: [{
      role: 'undo'
    }, {
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      role: 'cut'
    }, {
      role: 'copy'
    }, {
      role: 'paste'
    }, {
      role: 'pasteandmatchstyle'
    }, {
      role: 'delete'
    }, {
      role: 'selectall'
    }]
  }, {
    label: 'View',
    submenu: [{
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click (item, focusedWindow) {
        if (focusedWindow) focusedWindow.reload()
      }
    }, {
      type: 'separator'
    }, {
      role: 'resetzoom'
    }, {
      role: 'zoomin'
    }, {
      role: 'zoomout'
    }, {
      type: 'separator'
    }
  ]
}]

Menu.setApplicationMenu(Menu.buildFromTemplate(topBarMenu))
}