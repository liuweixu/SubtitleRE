export const SRTASSAlign = () => {
  // 点击按钮后触发
  async function click(
    input1: string,
    input2: string,
    output: string,
    srtsuffix: string,
    asssuffix: string,
    onLog: (log: string) => void // 日志回调函数
  ) {
    try {
      const { ipcRenderer } = window.require("electron");
      const fileInput1 = await ipcRenderer.invoke("read-directory", input1);
      const srtFilesInput1 = fileInput1.filter((file: string) =>
        file.endsWith(srtsuffix)
      );
      const fileInput2 = await ipcRenderer.invoke("read-directory", input2);
      const srtFilesInput2 = fileInput2.filter((file: string) =>
        file.endsWith(asssuffix)
      );

      // 获取基础文件名
      const getBaseName = (filename: string) => filename.split(".")[0];

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
      const alignfails: string[] = [];
      for (const pair of pairs) {
        const inputAlign = [pair[0], pair[1], input1, input2, output];
        const logtext = await ipcRenderer.invoke(
          "align_processing",
          inputAlign
        );
        if (logtext.success) {
          onLog(`${pair[0]} 对齐成功!\n`);
        } else {
          alignfails.push(`${pair[0]} 对齐失败: ${logtext.error}\n`);
        }
      }
      if (alignfails.length > 0) {
        onLog(`\n\n以下文件对齐失败：\n${alignfails.join("\n")}`);
      }
    } catch (err) {
      console.error("读取目录出错:", err);
    }
  }

  return {
    click,
  };
};
