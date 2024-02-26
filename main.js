const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

var appUrl = "websitename";

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1500,
    maximizable: true,
    height: 1200,
    hasShadow: true,
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, './icon.ico')
  });

  mainWindow.webContents.on('certificate-error', (event, url, error, certificate, callback) => {
    event.preventDefault();
    callback(true);
  });



  // Load the website
  mainWindow.loadURL(appUrl);
 // Create menu template
 const menuTemplate = [
  {
    label: 'Back',
    accelerator: 'Alt+Left',
    click: () => {
      if (mainWindow.webContents.canGoBack()) {
        mainWindow.webContents.goBack();
      }
    }
  },
  {
    label: 'Forward',
    accelerator: 'Alt+Right',
    click: () => {
      if (mainWindow.webContents.canGoForward()) {
        mainWindow.webContents.goForward();
      }
    }
  },
  {
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: () => {
      mainWindow.webContents.reload();
    }
  }
];

  // Build menu from template
  const menu = Menu.buildFromTemplate(menuTemplate);

  // Set the application menu
  Menu.setApplicationMenu(menu);
});

