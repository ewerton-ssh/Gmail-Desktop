const { app, BrowserWindow, shell } = require('electron');
const contextMenu = require('electron-context-menu');

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    icon: __dirname + '/assets/gmail.ico',
    autoHideMenuBar: true,
  });

  mainWindow.webContents.setWindowOpenHandler(() => {
    return {action: "deny"}
  })

  mainWindow.loadURL('https://mail.google.com/');

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
      inspect: 'Inspecionar elemento',
      selectAll: 'Selecionar tudo'
    },
    prepend: (params, browserWindow) => [{
      label: 'Copiar link',
      visible: params.linkURL !== undefined,
      click: () => {
        clipboard.writeText(params.linkURL);
      }
    }],
    append: (defaultActions, params, browserWindow) => [
      {
        label: 'Abrir link no navegador',
        click: () => {
          shell.openExternal(params.linkURL);
        }
      }
    ]
  });
});
