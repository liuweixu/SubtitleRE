// const fs = require('fs')
// const path = require('path')
import fs from "fs";
import path from "path";

function modifyScaledBorder(assContent, yesorno) {
  //对文件分割
  let lines = assContent.split("\n");
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
      let scales = line.split(":");
      scales[1] = " " + yesorno;
      lines[i] = scales.join(":");
      modify = true;
    }
  }
  return lines.join("\n");
}

function ScaledBorderAndShadowProcess(
  input_dir,
  filename,
  yes_or_no,
  callback
) {
  const assFilePath = path.join(input_dir, filename);
  fs.readFile(assFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("读取文件出错:", err);
      if (callback) callback(err);
      return;
    }
    const new_data = modifyScaledBorder(data, yes_or_no);
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

export default ScaledBorderAndShadowProcess;
