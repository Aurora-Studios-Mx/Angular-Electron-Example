const { app, ipcMain, BrowserWindow } = require("electron");

let appWin;

//This function creates the window and its properties.
createWindow = () => {
    appWin = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Angular and Electron",
        resizable: false,
        webPreferences: {
            nodeIntegration: true, // Permite la integración de Node.js
            contextIsolation: false, // Deshabilita el aislamiento de contexto para permitir la integración de Node.js
            enableRemoteModule: true // Habilita el módulo remoto para permitir la integración de Node.js
        }
    });

    appWin.loadURL(`file://${__dirname}/dist/browser/index.html`);

    appWin.setMenu(null);

    appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

/* ipcMain is listening the "message" channel, and when the message arrives, 
  it replies with "pong" */
ipcMain.on("message", (event) => event.reply("reply", "pong"));