const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    saveNote: (note) => {
        ipcRenderer.send('save-note', note)
    },
    getNotes: () => {
        ipcRenderer.send('get-notes')
    },
    deleteNotes: () => {
        ipcRenderer.send('delete-note')
    },
})
