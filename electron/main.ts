import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";
import fs from "fs";
import { mkdir } from "fs/promises";
import { SrtAssConvert } from "./srt-ass-convert-electron";

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

// 处理文件目录读取请求
ipcMain.handle("read-directory", async (event, dirPath) => {
  try {
    const files = await fs.promises.readdir(dirPath);
    return files;
  } catch (error) {
    console.error("读取目录出错:", error);
    throw error;
  }
});

ipcMain.handle("srtassconvert_processing", async (event, inputdata) => {
  try {
    const input = inputdata[0];
    const file = inputdata[1];
    const output = inputdata[2];
    const style = inputdata[3];
    const basename = inputdata[4];

    try {
      await mkdir(output, { recursive: true });
    } catch (err: unknown) {
      if (err instanceof Error && "code" in err && err.code !== "EEXIST") {
        throw err;
      }
    }

    return new Promise((resolve, reject) => {
      SrtAssConvert(input, file, output, style, basename, (error, result) => {
        if (error) {
          reject({
            success: false,
            error: error.message,
          });
        } else {
          resolve({
            success: true,
            file: result,
          });
        }
      });
    });
  } catch (error) {
    console.error("处理失败:", error);
    throw error;
  }
});
