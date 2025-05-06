import { useState } from "react";

const ASSFontNameEdit = () => {
  // 日志记录
  const [inputText, setInputText] = useState("");
  let resultLogText = ""; // 暂时存储结果文本
  async function click(input_dir, suffix, style, fontname) {
    const { ipcRenderer } = window.require("electron");
    const fileinput = await ipcRenderer.invoke("read-directory", input_dir);
    const assFilesInput = fileinput.filter((file) => file.endsWith(suffix));

    for (const file of assFilesInput) {
      const inputdata = [input_dir, file, style, fontname];
      const logtext = await ipcRenderer.invoke(
        "fontname_processing",
        inputdata
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
    onClear: () => {
      setInputText("");
    },
    inputText,
  };
};
export default ASSFontNameEdit;
