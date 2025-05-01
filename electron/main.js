// const { app, BrowserWindow } = require('electron')
import { app, BrowserWindow } from 'electron'
// const path = require('path')
import path from 'path'
import { fileURLToPath } from 'url'
import { ipcMain } from 'electron'
import fs from 'fs'
import { exec } from 'child_process'
import { mkdir } from 'fs/promises'
import ScaledBorderAndShadowProcess from './scaledProcessing.js'  // 必须添加.js，否则会报错
import FontNameProcess from './fontNameProcess.js'
import StyleInformationProcess from './styleInformationProcess.js'


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

  // if (app.isPackaged) {
    // win.loadFile(path.join(__dirname, '../dist/index.html'))
  // } else {
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  // }
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
    // const { exec } = require('child_process')
    // const { mkdir } = require('fs').promises
    // const path = require('path')
    
    // // 确保输出目录存在
    try {
      await mkdir(output, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }
    const srtpath = path.join(input1, srtfile)
    const asspath = path.join(input2, assfile)
    return new Promise((resolve, reject) => {
      // 处理ASS转SRT
      if (asspath.endsWith('.ass')) {
        const tempSrtFile = path.join(output, 'temp.srt')
        exec(`ffmpeg -i "${asspath}" "${tempSrtFile}"`, (error) => {
          if (error) {
            reject(error)
            return
          }
          // 调用alass进行对齐
          const outputFile = path.join(output, srtfile);
          exec(`alass "${tempSrtFile}" "${srtpath}" "${outputFile}"`, (error) => {
            // 删除临时SRT文件
            fs.unlink(tempSrtFile, () => {})
            if (error) {
              // 返回失败文件信息
              resolve({
                success: false,
                error: error.message
              })
            } else {
              resolve({
                success: true,
                file: srtfile
              })
            }
          })
        })
      } else {
        // 直接调用alass对齐
        const outputFile = path.join(output, srtfile);
        exec(`alass "${asspath}" "${srtpath}" "${outputFile}"`, (error) => {
          if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      }
    })
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