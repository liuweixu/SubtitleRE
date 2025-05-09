import fs from "fs";
import path from "path";

function modifyScaledBorder(assContent: string, yesorno: string) {
  //对文件分割
  const lines = assContent.split("\n");
  let inScaledBorder = false;
  let modify = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("LayoutResX:") || line.startsWith("LayoutResY:")) {
      lines[i] = "";
    }
    if (line.trim().includes("[Script Info]")) {
      inScaledBorder = true;
      continue;
    }
    if (inScaledBorder && line[0] == "[") {
      if (modify == false) {
        const new_line = "ScaledBorderAndShadow: " + yesorno + "\n\n" + line;
        lines[i] = new_line;
      }
      inScaledBorder = false;
      break;
    }
    if (inScaledBorder && line.startsWith("ScaledBorderAndShadow:")) {
      const scales = line.split(":");
      scales[1] = " " + yesorno;
      lines[i] = scales.join(":");
      modify = true;
    }
  }
  return lines.join("\n");
}

export async function ScaledBorderAndShadowProcess(
  input_dir: string,
  filename: string,
  yes_or_no: string,
  callback: (err: Error | null, outputPath?: string) => void
) {
  const assFilePath = path.join(input_dir, filename);
  try {
    const data = await fs.promises.readFile(assFilePath, "utf8");
    const new_data = modifyScaledBorder(data, yes_or_no);
    const outputPath = path.join(input_dir, filename);
    fs.promises.writeFile(outputPath, new_data, "utf8");
    console.log("ASS文件修改成功, 已保存为:", outputPath);
    if (callback) callback(null, outputPath);
  } catch (err) {
    console.error("文件处理出错:", err);
    if (callback) callback(err as Error);
  }
}
