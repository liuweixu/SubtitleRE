const { ipcRenderer } = window.require("electron");

export const FolderSelector = async () => {
  const result = await ipcRenderer.invoke("open-directory-dialog");
  return result;
};
