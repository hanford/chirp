const webview = document.getElementById('twitter')
const { remote, ipcRenderer } = require('electron')

const shell = remote.shell;

webview.addEventListener('dom-ready', () => {
    //webview.openDevTools();
    webview.insertCSS("html{overflow-x:hidden;}")
})

//allow links to open externally
webview.addEventListener('new-window', function(e) {
    e.preventDefault();
    shell.openExternal(e.url);
});