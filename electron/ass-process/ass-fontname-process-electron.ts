import fs from "fs";
import path from "path";

function modifyFontName(assContent: string, style: string, fontname: string) {
  //对文件分割
  const lines = assContent.split("\n");
  let inScaledBorder = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("LayoutResX:") || line.startsWith("LayoutResY:")) {
      lines[i] = "";
    }
    if (line.trim().includes("[V4+ Styles]")) {
      inScaledBorder = true;
      continue;
    }
    if (inScaledBorder && line[0] == "[") {
      inScaledBorder = false;
      break;
    }
    if (
      inScaledBorder &&
      line.startsWith("Style: ") &&
      line.split(",")[0].split(":")[1].trim() === style.trim()
    ) {
      const styleinformations = line.split(",");
      styleinformations[1] = fontname;
      lines[i] = styleinformations.join(",");
    }
  }
  return lines.join("\n");
}

export async function FontNameProcess(
  input_dir: string,
  filename: string,
  style: string,
  fontname: string,
  callback: (err: Error | null, outputPath?: string) => void
) {
  const assFilePath = path.join(input_dir, filename);
  try {
    const data = await fs.promises.readFile(assFilePath, "utf8");
    const new_data = modifyFontName(data, style, fontname);
    const outputPath = path.join(input_dir, filename);
    fs.promises.writeFile(outputPath, new_data, "utf8");
    console.log("ASS文件修改成功, 已保存为:", outputPath);
    if (callback) callback(null, outputPath);
  } catch (err) {
    console.error("文件处理出错:", err);
    if (callback) callback(err as Error);
  }
}
