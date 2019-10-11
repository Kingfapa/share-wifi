// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')
const iconPath = path.join(__dirname, './icons/Iconsmind-Outline-Wifi-2.ico')
const { wlan } = require('./wifi');
const trayTemplate = [
  {
    label: 'Force Start Hostednetwork',
    click: async () => {
      console.log('Force start clicked!');
      console.log(await wlan.running());
    }
  },
  {
    label: 'Exit',
    click: async () => {
      console.log('Quit tray!')
      app.quit();
    }
  }
]

function createWindow() {
  tray = new Tray(iconPath)
  const ctxMenu = Menu.buildFromTemplate(trayTemplate);
  tray.setToolTip('Wifi Sharing')
  tray.setContextMenu(ctxMenu);
  console.log('Created Tray!')
}
app.on('ready', createWindow)
