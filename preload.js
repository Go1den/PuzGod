const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    onInfo: (callback) => {
        ipcRenderer.on('info', callback);
    },
    onNotepad: (callback) => {
        ipcRenderer.on('notepad', callback);
    },
    onOpen: (callback) => {
        ipcRenderer.on('open', callback);
    },
    onPrintPuzzle: (callback) => {
        ipcRenderer.on('print-puzzle', callback);
    },
    onSaveAs: (callback) => {
        ipcRenderer.on('save-as', callback);
    },
    onSettings: (callback) => {
        ipcRenderer.on('settings', callback);
    },
    onRestart: (callback) => {
        ipcRenderer.on('restart', callback);
    },
    onCheckLetter: (callback) => {
        ipcRenderer.on('checkLetter', callback);
    },
    onCheckWord: (callback) => {
        ipcRenderer.on('checkWord', callback);
    },
    onCheckPuzzle: (callback) => {
        ipcRenderer.on('checkPuzzle', callback);
    },
    onRevealLetter: (callback) => {
        ipcRenderer.on('revealLetter', callback);
    },
    onRevealWord: (callback) => {
        ipcRenderer.on('revealWord', callback);
    },
    onRevealPuzzle: (callback) => {
        ipcRenderer.on('revealPuzzle', callback);
    },
    onRebus: (callback) => {
        ipcRenderer.on('rebus', callback);
    },
});
