// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')
const iconPath = path.join(__dirname, './icons/Iconsmind-Outline-Wifi-2.ico')
const { wlan } = require('./wifi');
const trayTemplate = [
  {
    label: 'Commands',
    submenu: [
      {
        label: 'Show Hostednetwork',
        click: async () => {
          console.log('Showing hostednetwork');
          console.log(await wlan.running());
        }
      },
      {
        label: 'Start Hostednetwork',
        click: async () => {
          console.log('Starting hostednetwork!');
          console.log(await wlan.start());
        }
      },
      {
        label: 'Stop Hostednetwork',
        click: async () => {
          console.log('Stopping hostednework!');
          console.log(await wlan.stop());
        }
      },
    ]
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
