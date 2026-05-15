const { app, BrowserWindow, Menu, ipcMain } = require('electron')

// run this as early in the main process as possible
if (require('electron-squirrel-startup')) app.quit();

require('update-electron-app')()

app.setAppUserModelId("com.squirrel.PuzGod.PuzGod");

let mainWindow;

const createWindow = () => {
  const win = new BrowserWindow({
	  show: false,
	  fullscreen: false,
	  width: 1280,
	  height: 720,
	  minWidth: 1280,
	  minHeight: 720,
    webPreferences: {
      preload: require('path').join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  }
  )
  win.loadFile('index.html')
  win.show()

  // Store reference to main window
  mainWindow = win;

  mainWindow.webContents.setWindowOpenHandler(() => ({
  action: "allow",
  overrideBrowserWindowOptions: {
    autoHideMenuBar: true,
    menuBarVisible: false
  }}));

  // Create menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Info',
          accelerator: 'CmdOrCtrl+I',
          click: () => {
            win.webContents.send('info');
          }
        },
        {
          label: 'Notepad',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            win.webContents.send('notepad');
          }
        },
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            win.webContents.send('open');
          }
        },
        {
          label: 'Print',
          accelerator: 'CmdOrCtrl+P',
          click: () => {
            win.webContents.send('print-puzzle');
          }
        },
        {
          label: 'Save as iPuz',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            win.webContents.send('save-as-ipuz');
          }
        },
        {
          label: 'Settings',
          accelerator: 'CmdOrCtrl+E',
          click: () => {
            win.webContents.send('settings');
          }
        },
        {
          label: 'Restart',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            win.webContents.send('restart');
          }
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'toggleFullScreen' }
      ]
    },
    {      
      label: 'Check',
      submenu: [
        {
          label: 'Letter',
          accelerator: 'CmdOrCtrl+1',
          click: () => {
            win.webContents.send('checkLetter');
          }
        },
        {
          label: 'Word',
          accelerator: 'CmdOrCtrl+2',
          click: () => {
            win.webContents.send('checkWord');
          }
        },
        {
          label: 'Puzzle',
          accelerator: 'CmdOrCtrl+3',
          click: () => {
            win.webContents.send('checkPuzzle');
          }
        },
      ]
    },
    {      
      label: 'Reveal',
      submenu: [
        {
          label: 'Letter',
          accelerator: 'CmdOrCtrl+4',
          click: () => {
            win.webContents.send('revealLetter');
          }
        },
        {
          label: 'Word',
          accelerator: 'CmdOrCtrl+5',
          click: () => {
            win.webContents.send('revealWord');
          }
        },
        {
          label: 'Puzzle',
          accelerator: 'CmdOrCtrl+6',
          click: () => {
            win.webContents.send('revealPuzzle');
          }
        },
      ]
    },
    {      
      label: 'Rebus',
      accelerator: 'Esc',
      click: () => {
        win.webContents.send('rebus');
      }
    }
  ];
  
  const menu = Menu.buildFromTemplate(template);
  win.setMenu(menu);
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})