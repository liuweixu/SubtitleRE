import { verify } from "@models/common/verify-blank";
import { verify_suffix } from "@models/common/verify-suffix";
import { ReferenceFormat } from "@models/common/reference_format";

export const ASS_ScaleProcess = () => {
  // 点击按钮后触发
  async function click(
    input_dir: string,
    suffix: string,
    target: string,
    onLog: (log: string) => void
  ) {
    suffix = suffix.trim();
    target = target.trim();
    if (!verify([input_dir, suffix, target])) {
      onLog(`请输入完整的参数\n\n`);
      return;
    }
    if (!verify_suffix(suffix, "ass")) {
      onLog(`ass后缀名有误\n参考格式: ${ReferenceFormat.ASSSuffix}\n\n`);
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
      const inputdata = [input_dir, file, target];
      const logtext = await ipcRenderer.invoke("scaled_processing", inputdata);
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
