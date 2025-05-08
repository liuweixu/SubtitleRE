export const ASS_FontNameProcess = () => {
  async function click(
    input_dir: string,
    suffix: string,
    style: string,
    fontname: string,
    onLog: (log: string) => void // 日志回调函数
  ) {
    suffix = suffix.trim();
    const { ipcRenderer } = window.require("electron");
    const fileinput = await ipcRenderer.invoke("read-directory", input_dir);
    const assFilesInput = fileinput.filter((file: string) =>
      file.endsWith(suffix)
    );
    style = style.trim();
    fontname = fontname.trim();
    for (const file of assFilesInput) {
      const inputdata = [input_dir, file, style, fontname];
      const logtext = await ipcRenderer.invoke(
        "fontname_processing",
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
