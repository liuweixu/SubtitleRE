export const ASS_ScaleProcess = () => {
  // 点击按钮后触发
  async function click(
    input_dir: string,
    suffix: string,
    target: string,
    onLog: (log: string) => void
  ) {
    suffix = suffix.trim();
    const { ipcRenderer } = window.require("electron");
    const fileinput = await ipcRenderer.invoke("read-directory", input_dir);
    const assFilesInput = fileinput.filter((file: string) =>
      file.endsWith(suffix)
    );
    target = target.trim();
    for (const file of assFilesInput) {
      const inputdata = [input_dir, file, target];
      const logtext = await ipcRenderer.invoke("scaled_processing", inputdata);
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
