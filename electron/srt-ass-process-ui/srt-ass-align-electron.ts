import fs from "fs";
import path from "path";
import { exec } from "child_process";

export function SrtAssAlign(
  srtfile: string,
  assfile: string,
  input1: string,
  input2: string,
  output: string,
  callback: (err: Error | null, outputPath?: string) => void
) {
  const srtpath = path.join(input1, srtfile);
  const asspath = path.join(input2, assfile);
  // 处理ASS转SRT
  if (asspath.endsWith(".ass")) {
    const tempSrtFile = path.join(output, "temp.srt");
    exec(`ffmpeg -i "${asspath}" "${tempSrtFile}"`, (error) => {
      if (error) {
        if (callback) callback(error);
      }
      // 调用alass进行对齐
      const outputFile = path.join(output, srtfile);
      exec(`alass "${tempSrtFile}" "${srtpath}" "${outputFile}"`, (error) => {
        // 删除临时SRT文件
        fs.unlink(tempSrtFile, () => {});
        if (error) {
          if (callback) callback(error);
        } else {
          if (callback) callback(null, srtfile);
        }
      });
    });
  } else {
    // 直接调用alass对齐
    const outputFile = path.join(output, srtfile);
    exec(`alass "${asspath}" "${srtpath}" "${outputFile}"`, (error) => {
      if (error) {
        if (callback) callback(error);
      } else {
        if (callback) callback(null, srtfile);
      }
    });
  }
}
