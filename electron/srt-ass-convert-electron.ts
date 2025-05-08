import fs from "fs";
import path from "path";

function convertion(data: string, style: string) {
  const stylename = style.split(",")[0].trim().split(":")[1].trim();
  const assContent = [
    "[Script Info]",
    "ScriptType: v4.00+",
    "WrapStyle: 2",
    "ScaledBorderAndShadow: yes",
    "PlayResX: 1920",
    "PlayResY: 1080",
    "YCbCr Matrix: TV.709",
    "",
    "[V4+ Styles]",
    "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
    style,
    "",
    "[Events]",
    "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
  ];
  const timePattern = /(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/;
  const blocks = data.trim().split(/\n{2,}/);

  for (const block of blocks) {
    const lines = block.split("\n");
    if (lines.length < 3) continue;

    const match = lines[1].match(timePattern);
    if (!match) continue;

    // 处理开始时间 (00:00:14,200 → 00:00:14.20)
    const startTime = match[1];
    const startParts = startTime.split(",");
    const startSeconds = startParts[0];
    const startMs = startParts[1].substring(0, 2); // 取前两位毫秒
    const start = `${startSeconds}.${startMs}`;

    // 处理结束时间 (00:00:16,070 → 00:00:16.07)
    const endTime = match[2];
    const endParts = endTime.split(",");
    const endSeconds = endParts[0];
    const endMs = endParts[1].substring(0, 2); // 取前两位毫秒
    const end = `${endSeconds}.${endMs}`;

    const text = lines.slice(2).join("\\N").trim();

    assContent.push(`Dialogue: 0,${start},${end},${stylename},,0,0,0,,${text}`);
  }
  const new_data = assContent.join("\n");
  return new_data;
}

export function SrtAssConvert(
  input: string,
  file: string,
  output: string,
  style: string,
  basename: string,
  callback: (err: Error | null, outputPath?: string) => void
) {
  const srtFilePath = path.join(input, file);
  fs.readFile(srtFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("读取文件出错:", err);
      if (callback) callback(err);
      return;
    }
    const new_data = convertion(data, style);
    const outputPath = path.join(output, basename + ".jp.ass");
    fs.writeFile(outputPath, new_data, "utf-8", (err) => {
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
