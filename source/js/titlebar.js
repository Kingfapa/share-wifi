//TitleBar
const remote = require('electron').remote;
const customTitlebar = require('custom-electron-titlebar');
const titlebar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#444'),
    icon: './icons/Iconsmind-Outline-Wifi-2.ico',
});
document.title = 'Share Wifi'
titlebar.updateTitle();

//To avoid "Attempting to call a function in a renderer window that has been closed or released."
let currentWindow = remote.getCurrentWindow()
window.onbeforeunload = (e) => {
    currentWindow.removeAllListeners();
}

console.log('Loaded titlebar!')