import { useState } from "react";

const SRTAndASSAlign = () => {
  // 日志记录
  const [inputText, setInputText] = useState("");
  let resultLogText = ""; // 暂时存储结果文本

  // 进度条
  const [progress_percent, setProgresspercent] = useState(0.0);
  // 点击按钮后触发
  async function click(input1, input2, output, srtsuffix, asssuffix) {
    try {
      const { ipcRenderer } = window.require("electron");
      const fileInput1 = await ipcRenderer.invoke("read-directory", input1);
      const srtFilesInput1 = fileInput1.filter((file) =>
        file.endsWith(srtsuffix)
      );
      const fileInput2 = await ipcRenderer.invoke("read-directory", input2);
      const srtFilesInput2 = fileInput2.filter((file) =>
        file.endsWith(asssuffix)
      );

      // 获取基础文件名
      const getBaseName = (filename) => filename.split(".")[0];

      // 查找匹配的文件对
      const pairs = [];
      for (const jpFile of srtFilesInput1) {
        const baseJp = getBaseName(jpFile);
        for (const cnFile of srtFilesInput2) {
          const baseCn = getBaseName(cnFile);
          if (baseJp === baseCn) {
            pairs.push([jpFile, cnFile]);
            break;
          }
        }
      }
      //保存对齐失败信息
      let alignfails = [];
      for (const pair of pairs) {
        const inputAlign = [pair[0], pair[1], input1, input2, output];
        const logtext = await ipcRenderer.invoke(
          "align_processing",
          inputAlign
        );
        if (logtext.success) {
          resultLogText += `${pair[0]} 对齐成功!\n`;
        } else {
          alignfails.push(`${pair[0]} 对齐失败: ${logtext.error}\n`);
        }
        setInputText(resultLogText);
        // 更新进度条
        setProgresspercent(
          (((pairs.indexOf(pair) + 1) / pairs.length) * 100).toFixed(2)
        );
      }
      if (alignfails.length > 0) {
        resultLogText += `\n\n以下文件对齐失败：\n${alignfails.join("\n")}`;
        setInputText(resultLogText);
      }
    } catch (err) {
      console.error("读取目录出错:", err);
    }
  }
  return {
    inputText,
    click,
    onClear: () => setInputText(""),
    progress_percent,
  };
};
export default SRTAndASSAlign;
