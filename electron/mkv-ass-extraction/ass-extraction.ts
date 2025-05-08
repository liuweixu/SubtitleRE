import fs from "fs";
import path from "path";

const ass_extracting = (data: string, language: string) => {
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
};

export function ASSExtractor(
  input: string,
  file: string,
  output: string,
  language: string,
  basename: string,
  callback: (err: Error | null, outputPath?: string) => void
) {
  const assInputFile = path.join(input, file);
  fs.readFile(assInputFile, "utf-8", (err, data) => {
    if (err) {
      console.log("读取文件出错");
      if (callback) callback(err);
      return;
    }
    const new_data = ass_extracting(data, language);

    const assOutputFile = path.join(
      output,
      basename + "." + language.toLowerCase() + ".ass"
    );
    fs.writeFile(assOutputFile, new_data, "utf-8", (err) => {
      if (err) {
        console.error("写入文件出错:", err);
        if (callback) callback(err);
        return;
      }
      console.log("ASS文件修改成功, 已保存为:", assOutputFile);
      if (callback) callback(null, assOutputFile);
    });
  });
}
