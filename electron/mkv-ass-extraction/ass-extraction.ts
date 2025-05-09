import fs from "fs";
import path from "path";

const ass_extracting = (data: string, language: string) => {
  const lines = data.split("\n");
  const new_lines = [];
  let isEvent = false;
  for (const line of lines) {
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

export async function ASSExtractor(
  input: string,
  file: string,
  output: string,
  language: string,
  basename: string,
  callback: (err: Error | null, outputPath?: string) => void
) {
  const assInputFile = path.join(input, file);
  try {
    const data = await fs.promises.readFile(assInputFile, "utf8");
    const new_data = ass_extracting(data, language);
    const assOutputFile = path.join(
      output,
      basename + "." + language.toLowerCase() + ".ass"
    );
    fs.promises.writeFile(assOutputFile, new_data, "utf8");
    console.log("ASS文件提取成功, 已保存为:", assOutputFile);
    if (callback) callback(null, assOutputFile);
  } catch (err) {
    console.error("文件处理出错:", err);
    if (callback) callback(err as Error);
  }
}
