import { verify } from "@models/common/verify-blank";
import { verify_suffix } from "@models/common/verify-suffix";
import { ReferenceFormat } from "@models/common/reference_format";

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
      if (!verify([input1, input2, output, srtsuffix, asssuffix])) {
        onLog(`请输入完整的参数\n\n`);
        return;
      }
      if (!verify_suffix(srtsuffix, "srt")) {
        onLog(`srt后缀名有误\n参考格式: ${ReferenceFormat.SRTSuffix}\n\n`);
        return;
      }
      if (!verify_suffix(asssuffix, "ass")) {
        onLog(`ass后缀名有误\n参考格式: ${ReferenceFormat.ASSSuffix}\n\n`);
        return;
      }
      const { ipcRenderer } = window.require("electron");
      const fileInput1 = await ipcRenderer.invoke("read-directory", input1);
      if (fileInput1.success === false) {
        onLog(`读取 ${input1} 目录失败\n失败信息: ${fileInput1.error}\n\n`);
        return;
      }
      const srtFilesInput = fileInput1.files.filter((file: string) =>
        file.endsWith(srtsuffix)
      );
      if (srtFilesInput.length === 0) {
        onLog(`${input1} 目录下没有 ${srtsuffix} 后缀的文件\n\n`);
        return;
      }
      const fileInput2 = await ipcRenderer.invoke("read-directory", input2);
      if (fileInput2.success === false) {
        onLog(`读取 ${input2} 目录失败\n失败信息: ${fileInput2.error}\n\n`);
        return;
      }
      const assFilesInput = fileInput2.files.filter((file: string) =>
        file.endsWith(asssuffix)
      );
      if (assFilesInput.length === 0) {
        onLog(`${input2} 目录下没有 ${asssuffix} 后缀的文件\n\n`);
        return;
      }

      // 获取基础文件名
      const getBaseName = (filename: string) => filename.split(".")[0];

      // 查找匹配的文件对
      const pairs = [];
      for (const jpFile of srtFilesInput) {
        const baseJp = getBaseName(jpFile);
        for (const cnFile of assFilesInput) {
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
      onLog("\n");
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
