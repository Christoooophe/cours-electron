const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('fs')

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('index.html')

    mainWindow.webContents.openDevTools()

    mainWindow.webContents.send('get-notes', )
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

ipcMain.on('save-note', (event, note) => {
    fs.writeFileSync(`notes/${note}.txt`, note);
})

ipcMain.on('delete-note', (event, note) => {
    fs.unlink("notes/"+note, (err) => {
        if (err) throw err;
        console.log("Fichier supprimé avec succès!");
    });
})

ipcMain.on('get-notes', () => {
    fs.readdir('./notes/', (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    });
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
