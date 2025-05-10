const { ipcRenderer } = window.require("electron");

export const folderSelector = async () => {
  const result = await ipcRenderer.invoke("open-directory-dialog");
  return result;
};
