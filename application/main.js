const { app, ipcMain, BrowserWindow, Menu } = require("electron");
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main')
const fs = require('fs')
const path = require('path')
const DiscordRPC = require('discord-rpc')
const YoutubeMusicApi = require('youtube-music-api')

//Storage data
const os = require('os');
const storage = require('electron-json-storage');
storage.setDataPath(path.join(os.homedir(), 'Aurora', 'Aurora-Music', 'ApplicationData'));

require('dotenv').config({ path: path.resolve(__dirname, '.env') })

// Youtube Music API
const api = new YoutubeMusicApi();
api.initalize();

console.clear();
let appWin;

setupTitlebar()

createWindow = () => {
    appWin = new BrowserWindow({
        width: 1300,
        height: 650,
        frame: false,
        titleBarStyle: 'hidden',
        title: 'Aurora Music',
        titleBarOverlay: true,
        resizable: false,
        icon: path.resolve(__dirname, 'src/assets/', 'application_app.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: `${__dirname}/preload.js`
        }
    });

    const menu = Menu.buildFromTemplate(exampleMenuTemplate)
    Menu.setApplicationMenu(menu)

    appWin.loadURL(`file://${__dirname}/dist/browser/index.html`);

    appWin.webContents.openDevTools();

    attachTitlebarToWindow(appWin)

    appWin.on("closed", () => {
        appWin = null;
    });
}

function generateNewConfigurationJSON(){

    const downloadsDir = fs.existsSync(path.join(os.homedir(), 'Aurora', 'Aurora-Music', 'OfflineData'))

    if(downloadsDir === false){
        fs.mkdir(path.join(os.homedir(), 'Aurora', 'Aurora-Music', 'OfflineData'), { recursive: true }, (err) => {
            if (err) throw err;
        });
    }

    storage.get('configuration', (error, data) => {
        if (error) throw error;

        const stringify = JSON.stringify(data)

        if(stringify === '{}'){
            const data = {
                init: true,
                downloadsDir: path.join(os.homedir(), 'Aurora', 'Aurora-Music', 'OfflineData')
            }

            storage.set('configuration', data, function(err) {
                if(err) throw err;
            })

            console.log("First time opening the app, generating new configuration file...");

        }
        else{
            console.log("Configuration file already exists, skipping generation...");
        }
    });
}

app.on("ready", () =>{    
    generateNewConfigurationJSON();

    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        rpc.destroy();
        app.quit();
    }
});

const exampleMenuTemplate = [
    {
        label: 'Test',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { type: 'separator' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { role: 'resetZoom' },
        ]
    }
]

//Discord RPC
const clientId = process.env.DISCORD_CLIENT;

DiscordRPC.register(clientId)

const rpc = new DiscordRPC.Client({
    transport: 'ipc'
})

async function setActivity() {
    if (!rpc || !appWin) {
        return;
    }

    rpc.setActivity({
        details: `Song name`,
        state: 'Artists name',
        smallImageKey: 'appicon',
        smallImageText: 'Aurora Music',
        instance: false,
    });
}

/* ipcMain is listening the "message" channel, and when the message arrives, 
it replies with "pong" */
ipcMain.on("message", (event) => event.reply("reply", "pong"));

ipcMain.on("discord", (event, args) => {
    if(args == "active") {
        rpc.on('ready', () => {
            setActivity();

            setInterval(() => {
                setActivity();
            }, 15e3);
        });

        rpc.login({ clientId }).catch(console.error);
        event.reply("discord:reply", "discord_true")
    }
    else if(args == "inactive") {
        if (rpc && rpc.user !== "") {
            rpc.destroy();
        }
        event.reply("discord:reply", "discord_false")
    }
});

ipcMain.on("youtube", (event, args) => {
    if (args[0].method == "search") {
        api.search(args[0].query, "song").then(result => {
            if (result) {
                setTimeout(() => {
                    event.reply("youtube:reply", [{ result: true, data: result }]);
                }, 3000);
            } else {
                event.reply("youtube:reply", [{ result: false, message: "Búsqueda sin resultados" }]);
            }
        }).catch(err => {
            console.error("Error en la búsqueda:", err);
            event.reply("youtube:reply", [{ result: false, message: "Error en la búsqueda" }]);
        });
    }
});
