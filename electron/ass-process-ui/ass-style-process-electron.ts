import fs from "fs";
import path from "path";

function modifyStyleInformation(
  assContent: string,
  stylename: string,
  styleinformation: string
) {
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
      line.split(",")[0].split(":")[1].trim() === stylename
    ) {
      const linesplits = line.split(",");
      const new_line = linesplits[0] + "," + styleinformation;
      lines[i] = new_line;
    }
  }
  return lines.join("\n");
}

export function AssStyleProcess(
  input_dir: string,
  filename: string,
  stylename: string,
  styleinformation: string,
  callback: (err: Error | null, outputPath?: string) => void
) {
  const assFilePath = path.join(input_dir, filename);
  fs.readFile(assFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("读取文件出错:", err);
      if (callback) callback(err);
      return;
    }
    const new_data = modifyStyleInformation(data, stylename, styleinformation);
    const outputPath = path.join(input_dir, filename);
    fs.writeFile(outputPath, new_data, "utf8", (err) => {
      if (err) {
        console.error("写入文件出错:", err);
        if (callback) callback(err);
        return;
      }
      console.log("ASS文件修改成功, 已保存为:", outputPath);
      if (callback) callback(null, outputPath);
    });
  });
}
