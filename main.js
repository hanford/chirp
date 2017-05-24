const {app, BrowserWindow, Menu, shell} = require('electron')
const path = require('path')
const url = require('url')
const config = require('./config')

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 375,
        height: 667,
        vibrancy: "light",
        autoHideMenuBar: true,
        alwaysOnTop: config.get("alwaysOnTop")
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    //mainWindow.openDevTools();
    mainWindow.on('closed', () => mainWindow = null)

    chirpMenu();
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

function chirpMenu(){

    const topBarMenu = [
        {
            label: 'Chirp',
            submenu: [
            {
                label: "About",
                click(){
                    shell.openExternal("https://jackhanford.com/chirp")
                }
            },
            {
                label: "Get the latest update",
                click(){
                    shell.openExternal("https://github.com/hanford/chirp/releases")
                }
            },
            {
                label: "Submit a bug report",
                click(){
                    shell.openExternal("https://github.com/hanford/chirp/issues")
                }
            },
            {
                role: 'quit'
            }
            ]
        },
        {
            label: 'Edit',
            submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                role: 'pasteandmatchstyle'
            },
            {
                role: 'delete'
            },
            {
                role: 'selectall'
            }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click (item, focusedWindow) {
                        if (focusedWindow) focusedWindow.reload()
                    }
                },
                {
                    type: 'separator'
                },
                {
                    role: 'resetzoom'
                },
                {
                    role: 'zoomin'
                },
                {
                    role: 'zoomout'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Toggle always on top',
                    accelerator: 'CmdOrCtrl+Shift+A',
                    click(){
                        mainWindow.setAlwaysOnTop(!config.get('alwaysOnTop'))
                        config.set("alwaysOnTop", mainWindow.isAlwaysOnTop())
                    }
                }
            ]
        }
    ]

    Menu.setApplicationMenu( Menu.buildFromTemplate(topBarMenu))
}