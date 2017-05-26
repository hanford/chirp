const webview = document.getElementById('twitter')
const { remote, ipcRenderer } = require('electron')
const Analytics = require('electron-google-analytics')

new Analytics.default('UA-45226320-3')

const shell = remote.shell

// webview.addEventListener('dom-ready', () => {
  // add modified twitter darkmode styles here!
  // webview.insertCSS('html{overflow-x:hidden;}')
// })

webview.addEventListener('new-window', e => {
  e.preventDefault()
  shell.openExternal(e.url)
})
