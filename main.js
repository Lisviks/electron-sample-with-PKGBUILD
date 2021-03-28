const {
  app,
  BrowserWindow,
  Notification,
  Menu,
  MenuItem,
  globalShortcut,
} = require('electron');
const path = require('path');

function showNotification() {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process',
  };
  new Notification(notification).show();
}

const menu = new Menu();
menu.append(
  new MenuItem({
    label: 'Electron',
    submenu: [
      {
        role: 'help',
        accelerator:
          process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
        click: () => {
          console.log('Electron rocks!');
        },
      },
    ],
  })
);

Menu.setApplicationMenu(menu);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I');
      event.preventDefault();
    }
  });
}

app
  .whenReady()
  .then(() => {
    globalShortcut.register('Alt+CommandOrControl+I', () => {
      console.log('Electron loves global shortcuts!');
    });
  })
  .then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  .then(showNotification);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
