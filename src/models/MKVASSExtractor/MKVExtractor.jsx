import { useState } from "react";

const MKVExtractor = () => {
  // 日志记录
  const [inputText, setInputText] = useState("");
  let resultLogText = ""; // 暂时存储结果文本

  // 进度计算
  const [progresspercent, setProgresspercent] = useState(0.0); // 进度条百分比

  // 点击按钮后触发
  async function click(input, output, track, language) {
    const { ipcRenderer } = window.require("electron");
    const fileinput = await ipcRenderer.invoke("read-directory", input);
    const mkvFilesInput = fileinput.filter((file) => file.endsWith(".mkv"));

    // 获取基础文件名
    const getBaseName = (filename) => filename.split(".")[0];
    for (const file of mkvFilesInput) {
      const basename = getBaseName(file);
      const inputdata = [input, file, track, output, language, basename];
      const logtext = await ipcRenderer.invoke(
        "mkvextractor_processing",
        inputdata
      );

      // 进度计算
      setProgresspercent(
        (
          ((mkvFilesInput.indexOf(file) + 1) / mkvFilesInput.length) *
          100
        ).toFixed(2)
      );

      if (logtext.success) {
        resultLogText += "处理成功，文件名为：" + logtext.file + "\n";
      } else {
        resultLogText += "处理失败：" + logtext.error + "\n";
      }
      setInputText(resultLogText);
    }
  }

  return {
    click,
    onClear: () => setInputText(""),
    inputText,
    progresspercent,
  };
};
export default MKVExtractor;
