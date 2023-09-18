const { app, BrowserWindow, shell} = require('electron');
const contextMenu = require('electron-context-menu');
const path = require('path');

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    icon: __dirname + '/assets/gmail.ico',
    autoHideMenuBar: true,
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    mainWindow.loadURL(url);
    return { action: 'deny' };
  });

  const mainURL = 'https://mail.google.com/';

  //mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.loadURL(mainURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.maximize();

  contextMenu({
    showSearchWithGoogle: false,
    showInspectElement: false,
    labels: {
      cut: 'Recortar',
      copy: 'Copiar',
      paste: 'Colar',
      save: 'Salvar imagem',
      copyLink: 'Copiar link',
      selectAll: 'Selecionar tudo'
    },
    prepend: (params) => [
      {
        label: 'Copiar link',
        visible: params.linkURL !== undefined,
        click: () => {
          clipboard.writeText(params.linkURL);
        },
      },
    ],
    append: (params) => [
      {
        label: 'Abrir link no navegador',
        click: () => {
          shell.openExternal(params.linkURL);
        },
      },
    ],
  });
});
