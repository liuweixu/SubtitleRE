import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
const execPromise = promisify(exec);

export async function SrtAssAlign(
  srtfile: string,
  assfile: string,
  input1: string,
  input2: string,
  output: string,
  callback: (err: Error | null, outputPath?: string) => void
) {
  const srtpath = path.join(input1, srtfile);
  const asspath = path.join(input2, assfile);

  try {
    if (asspath.endsWith(".ass")) {
      const tempSrtFile = path.join(output, "temp.srt");
      try {
        await execPromise(`ffmpeg -i "${asspath}" "${tempSrtFile}"`);
        const outputFile = path.join(output, srtfile);
        await execPromise(
          `alass "${tempSrtFile}" "${srtpath}" "${outputFile}"`
        );
        fs.unlink(tempSrtFile, () => {});
        callback(null, srtfile);
      } catch (error) {
        fs.unlink(tempSrtFile, () => {});
        const execError = error as {
          stdout?: string;
          stderr?: string;
          message?: string;
        };
        callback(
          new Error(
            `\n\n处理失败信息: ${error}\nstdout: ${execError?.stdout}\nstderr: ${execError?.stderr}`
          )
        ); // 不传递错误，让流程继续
      }
    } else {
      const outputFile = path.join(output, srtfile);
      try {
        await execPromise(`alass "${asspath}" "${srtpath}" "${outputFile}"`);
        callback(null, srtfile);
      } catch (error) {
        callback(error as Error); // 不传递错误，让流程继续
      }
    }
  } catch (error) {
    callback(error as Error); // 确保任何情况下都不会中断流程
  }
}
