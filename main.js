const { app, BrowserWindow, Tray } = require('electron')
const path = require("path");

let tray = null;
function createWindow() {
  let icoPath = path.join(__dirname, "icon.ico");
  tray = new Tray(icoPath);
  tray.setToolTip('This is my application.')

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
  })

  win.setIcon(icoPath);
  win.webContents.openDevTools();
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
