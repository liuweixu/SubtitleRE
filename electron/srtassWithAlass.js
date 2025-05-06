import fs from "fs";
import path from "path";
import { exec } from "child_process";

function SrtAssWithAlass(srtfile, assfile, input1, input2, output) {
  const srtpath = path.join(input1, srtfile);
  const asspath = path.join(input2, assfile);
  return new Promise((resolve, reject) => {
    // 处理ASS转SRT
    if (asspath.endsWith(".ass")) {
      const tempSrtFile = path.join(output, "temp.srt");
      exec(`ffmpeg -i "${asspath}" "${tempSrtFile}"`, (error) => {
        if (error) {
          reject(error);
          return;
        }
        // 调用alass进行对齐
        const outputFile = path.join(output, srtfile);
        exec(`alass "${tempSrtFile}" "${srtpath}" "${outputFile}"`, (error) => {
          // 删除临时SRT文件
          fs.unlink(tempSrtFile, () => {});
          if (error) {
            // 返回失败文件信息
            resolve({
              success: false,
              error: error.message,
            });
          } else {
            resolve({
              success: true,
              file: srtfile,
            });
          }
        });
      });
    } else {
      // 直接调用alass对齐
      const outputFile = path.join(output, srtfile);
      exec(`alass "${asspath}" "${srtpath}" "${outputFile}"`, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    }
  });
}

export default SrtAssWithAlass;
