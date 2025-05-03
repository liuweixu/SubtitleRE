import { useState } from 'react';

const SRTASSConvert = () => {

  const [inputText, setInputText] = useState('');

  // 日志记录
  
  let resultLogText = '' // 暂时存储结果文本
  // 点击按钮后触发
  async function click(input, suffix, output, style) {
    try {
      const { ipcRenderer } = window.require('electron')
      const fileInput = await ipcRenderer.invoke('read-directory', input)
      const srtFilesInput =  fileInput.filter(file => file.endsWith(suffix))

      // 获取基础文件名
      const getBaseName = (filename) => filename.split('.')[0];

      for(const file of srtFilesInput){
        const basename = getBaseName(file)
        const inputdata = [input, file, output, style, basename]
        const logtext = await ipcRenderer.invoke('srtassconvert_processing', inputdata)
        if(logtext.success){
          resultLogText += '处理成功，文件名为：' + logtext.file + '\n'
        }
        else{
            resultLogText += '处理失败：' + logtext.error + '\n'
        }
        setInputText(resultLogText)
      }
    } catch (err) {
        console.error('读取目录出错:', err)
    }
  }
  return {
    inputText,
    click,
    onClear: () => setInputText('')
  }
};
export default SRTASSConvert;