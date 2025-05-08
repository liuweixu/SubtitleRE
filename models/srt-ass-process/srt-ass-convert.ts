export const SRTASSConvert = () => {
  // 点击按钮后触发
  async function click(
    input: string,
    suffix: string,
    output: string,
    style: string,
    onLog: (log: string) => void // 日志回调函数
  ) {
    try {
      const { ipcRenderer } = window.require("electron");
      const fileInput = await ipcRenderer.invoke("read-directory", input);
      const srtFilesInput = fileInput.filter((file: string) =>
        file.endsWith(suffix)
      );

      // 获取基础文件名
      const getBaseName = (filename: string) => filename.split(".")[0];

      for (const file of srtFilesInput) {
        const basename = getBaseName(file);
        const inputdata = [input, file, output, style, basename];
        const logtext = await ipcRenderer.invoke(
          "srtassconvert_processing",
          inputdata
        );
        if (logtext.success) {
          onLog("处理成功，文件名为：" + logtext.file + "\n");
        } else {
          onLog("处理失败：" + logtext.error + "\n");
        }
      }
    } catch (err) {
      console.error("读取目录出错:", err);
    }
  }

  return {
    click,
  };
};
