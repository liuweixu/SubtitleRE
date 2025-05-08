export const MKVExtractor = () => {
  // 点击按钮后触发
  async function click(
    input: string,
    output: string,
    track: string,
    language: string,
    onLog: (log: string) => void // 日志回调函数
  ) {
    const { ipcRenderer } = window.require("electron");
    const fileinput = await ipcRenderer.invoke("read-directory", input);
    const mkvFilesInput = fileinput.filter((file: string) =>
      file.endsWith(".mkv")
    );

    // 获取基础文件名
    const getBaseName = (filename: string) => filename.split(".")[0];
    for (const file of mkvFilesInput) {
      const basename = getBaseName(file);
      const inputdata = [input, file, track, output, language, basename];
      const logtext = await ipcRenderer.invoke(
        "mkvextractor_processing",
        inputdata
      );

      if (logtext.success) {
        onLog("处理成功，文件名为：" + logtext.file + "\n");
      } else {
        onLog("处理失败：" + logtext.error + "\n");
      }
    }
  }

  return {
    click,
  };
};
