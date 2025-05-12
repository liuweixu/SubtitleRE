import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";
import fs from "fs";
import { mkdir } from "fs/promises";
import { SrtAssConvert } from "./srt-ass-process/srt-ass-convert-electron";
import { SrtAssAlign } from "./srt-ass-process/srt-ass-align-electron";
import { FontNameProcess } from "./ass-process/ass-fontname-process-electron";
import { AssStyleProcess } from "./ass-process/ass-style-process-electron";
import { ScaledBorderAndShadowProcess } from "./ass-process/ass-scaled-process-electron";
import { ASSExtractor } from "./mkv-ass-extraction/ass-extraction";
import { MKVExtractor } from "./mkv-ass-extraction/mkv-extraction";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // 必须添加，否则界面就空白

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 960,
    title: "字幕处理工具",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.setBackgroundColor("#000000");
  Menu.setApplicationMenu(null);
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
    return { success: true, files: files };
  } catch (error) {
    console.error("读取目录出错:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "未知错误",
    };
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

    return new Promise((resolve) => {
      SrtAssConvert(input, file, output, style, basename, (error, result) => {
        if (error) {
          resolve({
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

ipcMain.handle("align_processing", async (event, inputAlign) => {
  try {
    const srtfile = inputAlign[0];
    const assfile = inputAlign[1];
    const input1 = inputAlign[2];
    const input2 = inputAlign[3];
    const output = inputAlign[4];

    // // 确保输出目录存在
    try {
      await mkdir(output, { recursive: true });
    } catch (err: unknown) {
      if (err instanceof Error && "code" in err && err.code !== "EEXIST") {
        throw err;
      }
    }
    //异步调用alass命令程序
    return new Promise((resolve) => {
      SrtAssAlign(srtfile, assfile, input1, input2, output, (error, result) => {
        if (error) {
          //能够让程序处理错误后，能够继续运行
          resolve({
            success: false,
            error: error.message,
            file: srtfile,
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

ipcMain.handle("scaled_processing", async (event, inputdata) => {
  try {
    const input_dir = inputdata[0];
    const file = inputdata[1];
    const target_size = inputdata[2];

    return new Promise((resolve) => {
      ScaledBorderAndShadowProcess(
        input_dir,
        file,
        target_size,
        (error, result) => {
          if (error) {
            resolve({
              success: false,
              error: error?.message,
              file: result,
            });
          } else {
            resolve({
              success: true,
              file: result,
            });
          }
        }
      );
    });
  } catch (error) {
    console.error("处理失败:", error);
    throw error;
  }
});

ipcMain.handle("fontname_processing", async (event, inputdata) => {
  try {
    const input_dir = inputdata[0];
    const file = inputdata[1];
    const style = inputdata[2];
    const fontname = inputdata[3];

    return new Promise((resolve) => {
      FontNameProcess(input_dir, file, style, fontname, (error, result) => {
        if (error) {
          resolve({
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

ipcMain.handle("styleinformation_processing", async (event, inputdata) => {
  try {
    const input_dir = inputdata[0];
    const file = inputdata[1];
    const stylename = inputdata[2];
    const styleinformation = inputdata[3];

    return new Promise((resolve) => {
      AssStyleProcess(
        input_dir,
        file,
        stylename,
        styleinformation,
        (error, result) => {
          if (error) {
            resolve({
              success: false,
              error: error.message,
            });
          } else {
            resolve({
              success: true,
              file: result,
            });
          }
        }
      );
    });
  } catch (error) {
    console.error("处理失败:", error);
    throw error;
  }
});

ipcMain.handle("assextractor_processing", async (event, inputdata) => {
  try {
    const input = inputdata[0];
    const file = inputdata[1];
    const output = inputdata[2];
    const language = inputdata[3];
    const basename = inputdata[4];

    try {
      await mkdir(output, { recursive: true });
    } catch (err: unknown) {
      if (err instanceof Error && "code" in err && err.code !== "EEXIST") {
        throw err;
      }
    }

    return new Promise((resolve) => {
      ASSExtractor(input, file, output, language, basename, (error, result) => {
        if (error) {
          resolve({
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

ipcMain.handle("mkvextractor_processing", async (event, inputdata) => {
  try {
    //input, file, track, output, language, basename
    const input = inputdata[0];
    const file = inputdata[1];
    const track = inputdata[2];
    const output = inputdata[3];
    const language = inputdata[4];
    const basename = inputdata[5];

    try {
      await mkdir(output, { recursive: true });
    } catch (err: unknown) {
      if (err instanceof Error && "code" in err && err.code !== "EEXIST") {
        throw err;
      }
    }

    return new Promise((resolve) => {
      MKVExtractor(
        input,
        file,
        track,
        output,
        language,
        basename,
        (error, result) => {
          if (error) {
            resolve({
              success: false,
              error: error.message,
            });
          } else {
            resolve({
              success: true,
              file: result,
            });
          }
        }
      );
    });
  } catch (error) {
    console.error("处理失败:", error);
    throw error;
  }
});

ipcMain.handle("open-directory-dialog", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  return result.filePaths[0] || null;
});
