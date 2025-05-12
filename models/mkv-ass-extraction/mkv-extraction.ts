import { verify } from "@models/common/verify-blank";

export const MKVExtractor = () => {
  // 点击按钮后触发
  async function click(
    input: string,
    output: string,
    track: string,
    language: string,
    onLog: (log: string) => void // 日志回调函数
  ) {
    if (!verify([input, output, track, language])) {
      onLog(`请输入完整的参数\n\n`);
      return;
    }
    const { ipcRenderer } = window.require("electron");
    const fileinput = await ipcRenderer.invoke("read-directory", input);
    if (fileinput.success === false) {
      onLog(`读取 ${input} 目录失败\n失败信息: ${fileinput.error}\n\n`);
      return;
    }
    const mkvFilesInput = fileinput.files.filter((file: string) =>
      file.endsWith(".mkv")
    );
    if (mkvFilesInput.length === 0) {
      onLog(`${input} 目录下没有 mkv 后缀的文件\n\n`);
      return;
    }

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
    onLog("\n");
  }

  return {
    click,
  };
};
