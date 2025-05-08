export const ASS_StyleProcess = () => {
  async function click(
    input_dir: string,
    suffix: string,
    stylename: string,
    styleinformation: string,
    onLog: (log: string) => void // 日志回调函数
  ) {
    suffix = suffix.trim();
    const { ipcRenderer } = window.require("electron");
    const fileinput = await ipcRenderer.invoke("read-directory", input_dir);
    const assFilesInput = fileinput.filter((file: string) =>
      file.endsWith(suffix)
    );

    stylename = stylename.trim();
    styleinformation = styleinformation.trim();
    for (const file of assFilesInput) {
      const inputdata = [input_dir, file, stylename, styleinformation];
      const logtext = await ipcRenderer.invoke(
        "styleinformation_processing",
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
