import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // 必须添加，否则界面就空白

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "字幕处理工具",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
