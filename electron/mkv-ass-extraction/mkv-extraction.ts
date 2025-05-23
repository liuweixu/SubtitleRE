import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";
const execPromise = promisify(exec);

function isDigit(str: string) {
  return /^\d+$/.test(str);
}

function detect_subtitle_format(data: string) {
  const first_line = data.split("\n")[0].trim();
  if (first_line.startsWith("[Script Info]")) {
    return "ass";
  } else if (isDigit(first_line)) {
    return "srt";
  } else {
    return "unknown";
  }
}

function mkv_extracting(data: string, language: string) {
  const lines = data.split("\n");
  const new_lines = [];
  let isEvent = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().includes("[Events]")) {
      isEvent = true;
      new_lines.push(line);
      continue;
    }
    if (isEvent) {
      if (line.split(",").length < 9) {
        continue;
      }
      const style_name = line.split(",")[3].trim();
      const is_japanese =
        style_name.toUpperCase().includes("JP") ||
        style_name.toUpperCase().includes("JA") ||
        style_name.includes("少女日常日文") ||
        style_name.includes("日文歌詞方案") ||
        style_name.includes("正 文 日");
      if (
        (language.toLowerCase() === "chs" && is_japanese) ||
        (language.toLowerCase() === "jp" && !is_japanese)
      ) {
        continue;
      }
    }
    new_lines.push(line);
  }
  return new_lines.join("\n");
}

export async function MKVExtractor(
  input: string,
  file: string,
  track: string,
  output: string,
  language: string,
  basename: string,
  callback: (err: Error | null, outputPath?: string) => void
) {
  const mkvInputFile = path.join(input, file);
  const mkvTempFile = path.join(output, basename + "temp.sub");
  try {
    await execPromise(
      `mkvextract tracks "${mkvInputFile}" ${track}:"${mkvTempFile}"`
    );
    const data = await fs.promises.readFile(mkvTempFile, "utf-8");
    const detect_format = detect_subtitle_format(data);
    fs.unlink(mkvTempFile, () => {});
    if (detect_format == "ass") {
      const new_data = mkv_extracting(data, language);
      const mkvOutputFile = path.join(
        output,
        basename + "." + language.toLowerCase() + ".ass"
      );
      await fs.promises.writeFile(mkvOutputFile, new_data);
      console.log("已提取为ASS字幕");
      if (callback) callback(null, mkvOutputFile);
    } else if (detect_format == "srt") {
      console.log("属于SRT文件, 不能提取为相应的中文或日语ass字幕");
      const mkvOutputFileSRT = path.join(output, basename + ".srt");
      await fs.promises.writeFile(mkvOutputFileSRT, data);
      console.log("已提取为SRT字幕");
      if (callback) callback(null, mkvOutputFileSRT);
    } else {
      throw new Error("未知格式错误");
    }
  } catch (error) {
    if (callback) callback(error as Error);
  }
}
