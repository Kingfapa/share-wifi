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


  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#FFF',
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  /*mainWindow.on('minimize', function (event) {
    event.preventDefault();
    mainWindow.hide();
  })*/
}
app.on('ready', createWindow)
