import { verify } from "@models/common/verify-blank";
import { verify_suffix } from "@models/common/verify-suffix";
import { ReferenceFormat } from "@models/common/reference_format";
import { verify_style_part } from "@models/common/verify-style";

export const ASS_StyleProcess = () => {
  async function click(
    input_dir: string,
    suffix: string,
    stylename: string,
    styleinformation: string,
    onLog: (log: string) => void // 日志回调函数
  ) {
    suffix = suffix.trim();
    stylename = stylename.trim();
    styleinformation = styleinformation.trim();
    if (!verify([input_dir, suffix, stylename, styleinformation])) {
      onLog(`请输入完整的参数\n\n`);
      return;
    }
    if (!verify_suffix(suffix, "ass")) {
      onLog(`ass后缀名有误\n参考格式: ${ReferenceFormat.ASSSuffix}\n\n`);
      return;
    }
    if (!verify_style_part(styleinformation)) {
      onLog(`样式有误\n参考格式: ${ReferenceFormat.StylePART}\n\n`);
      return;
    }
    const { ipcRenderer } = window.require("electron");
    const fileinput = await ipcRenderer.invoke("read-directory", input_dir);
    if (fileinput.success === false) {
      onLog(`读取 ${input_dir} 目录失败\n失败信息: ${fileinput.error}\n\n`);
      return;
    }
    const assFilesInput = fileinput.files.filter((file: string) =>
      file.endsWith(suffix)
    );
    if (assFilesInput.length === 0) {
      onLog(`${input_dir} 目录下没有 ass 后缀的文件\n\n`);
      return;
    }
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
    onLog("\n");
  }

  return {
    click,
  };
};
