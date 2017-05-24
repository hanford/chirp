const webview = document.getElementById('twitter')
const { remote, ipcRenderer } = require('electron')
const Analytics = require('electron-google-analytics')
const analytics = new Analytics.default('UA-45226320-3')
analytics.pageview('http://example.com', '/home', 'Example')

const shell = remote.shell

webview.addEventListener('dom-ready', () => {
    webview.insertCSS("html{overflow-x:hidden;}")
})

webview.addEventListener('new-window', (e) => {
  e.preventDefault()
  shell.openExternal(e.url)
})
