import { verify } from "@models/common/verify-blank";
import { verify_suffix } from "@models/common/verify-suffix";
import { verify_style_all } from "@models/common/verify-style";
import { ReferenceFormat } from "@models/common/reference_format";

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
      if (!verify([input, suffix, output, style])) {
        onLog(`请输入完整的参数\n\n`);
        return;
      }
      if (!verify_suffix(suffix, "srt")) {
        onLog(`srt后缀名有误\n参考格式: ${ReferenceFormat.SRTSuffix}\n\n`);
        return;
      }
      if (!verify_style_all(style)) {
        onLog(`样式有误\n参考样式: ${ReferenceFormat.StyleALL}\n\n`);
        return;
      }
      const { ipcRenderer } = window.require("electron");
      const fileInput = await ipcRenderer.invoke("read-directory", input);
      if (fileInput.success === false) {
        onLog(`读取 ${input} 目录失败\n失败信息: ${fileInput.error}\n\n`);
        return;
      }
      const srtFilesInput = fileInput.files.filter((file: string) =>
        file.endsWith(suffix)
      );
      if (srtFilesInput.length === 0) {
        onLog(`${input} 目录下没有 ${suffix} 后缀的文件\n\n`);
        return;
      }

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
      onLog("\n");
    } catch (err) {
      console.error("读取目录出错:", err);
    }
  }

  return {
    click,
  };
};
