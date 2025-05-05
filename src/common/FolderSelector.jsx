const { ipcRenderer } = window.require('electron')

async function FolderSelector() {
    const result = await ipcRenderer.invoke('open-folder-dialog')
    if(!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0]
    }
    else{
        return ''
    }
}

export default FolderSelector;

