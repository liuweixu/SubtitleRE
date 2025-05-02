import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import { ipcMain } from 'electron'
import fs from 'fs'
import { mkdir } from 'fs/promises'
import SrtAssWithAlass from './srtassWithAlass.js'
import ScaledBorderAndShadowProcess from './scaledProcessing.js'  // 必须添加.js，否则会报错
import FontNameProcess from './fontNameProcess.js'
import StyleInformationProcess from './styleInformationProcess.js'
import SrtAssConvert from './srtassConvert.js'
import ASSExtractor from './assExtractor.js'


const __dirname = path.dirname(fileURLToPath(import.meta.url)) // 必须添加，否则界面就空白

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    title: '字幕处理工具',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  } else {
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 处理文件目录读取请求
ipcMain.handle('read-directory', async (event, dirPath) => {
  try {
    const files = await fs.promises.readdir(dirPath)
    return files
  } catch (error) {
    console.error('读取目录出错:', error)
    throw error
  }
})

ipcMain.handle('align_processing', async(event, inputAlign) => {
  try {
    const srtfile = inputAlign[0]
    const assfile = inputAlign[1]
    const input1 = inputAlign[2]
    const input2 = inputAlign[3]
    const output = inputAlign[4]
    
    // // 确保输出目录存在
    try {
      await mkdir(output, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }
    //异步调用alass命令程序
    return await SrtAssWithAlass(srtfile, assfile, input1, input2, output)
  } catch (error) {
    console.error('处理失败:', error)
    throw error
  }
})

ipcMain.handle('scaled_processing', async(event, inputdata) => {
  try {
    const input_dir = inputdata[0]
    const file = inputdata[1]
    const target_size = inputdata[2]

    return new Promise((resolve, reject) => {
      ScaledBorderAndShadowProcess(input_dir, file, target_size, (error, result) => {
        if (error) {
          reject({
            success: false,
            error: error.message
          })
        } else {
          resolve({
            success: true,
            file: result
          })
        }
      })
    })
  }
  catch (error) {
    console.error('处理失败:', error)
    throw error
  }
})


ipcMain.handle('fontname_processing', async(event, inputdata) => {
  try {
    const input_dir = inputdata[0]
    const file = inputdata[1]
    const style = inputdata[2]
    const fontname = inputdata[3]

    return new Promise((resolve, reject) => {
      FontNameProcess(input_dir, file, style, fontname, (error, result) => {
        if (error) {
          reject({
            success: false,
            error: error.message
          })
        } else {
          resolve({
            success: true,
            file: result
          })
        }
      })
    })
  }
  catch (error) {
    console.error('处理失败:', error)
    throw error
  }
})

ipcMain.handle('styleinformation_processing', async(event, inputdata) => {
  try {
    const input_dir = inputdata[0]
    const file = inputdata[1]
    const stylename = inputdata[2]
    const styleinformation = inputdata[3]

    return new Promise((resolve, reject) => {
      StyleInformationProcess(input_dir, file, stylename, styleinformation, (error, result) => {
        if (error) {
          reject({
            success: false,
            error: error.message
          })
        } else {
          resolve({
            success: true,
            file: result
          })
        }
      })
    })
  }
  catch (error) {
    console.error('处理失败:', error)
    throw error
  }
})


ipcMain.handle('srtassconvert_processing', async(event, inputdata) => {
  try {
    const input = inputdata[0]
    const file = inputdata[1]
    const output = inputdata[2]
    const style = inputdata[3]
    const basename = inputdata[4]
    
    try {
      await mkdir(output, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }

    return new Promise((resolve, reject) => {
      SrtAssConvert(input, file, output, style, basename, (error, result) => {
        if (error) {
          reject({
            success: false,
            error: error.message
          })
        } else {
          resolve({
            success: true,
            file: result
          })
        }
      })
    })
  }
  catch (error) {
    console.error('处理失败:', error)
    throw error
  }
})

ipcMain.handle('assextractor_processing', async(event, inputdata) => {
  try {
    const input = inputdata[0]
    const file = inputdata[1]
    const output = inputdata[2]
    const language = inputdata[3]
    const basename = inputdata[4]
    
    try {
      await mkdir(output, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }

    return new Promise((resolve, reject) => {
      ASSExtractor(input, file, output, language, basename, (error, result) => {
        if (error) {
          reject({
            success: false,
            error: error.message
          })
        } else {
          resolve({
            success: true,
            file: result
          })
        }
      })
    })
  }
  catch (error) {
    console.error('处理失败:', error)
    throw error
  }
})