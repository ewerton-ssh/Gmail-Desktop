const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/assets/gmail.ico'
  });

  mainWindow.setMenuBarVisibility(false)

  mainWindow.loadURL('https://mail.google.com/');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});