import React, {useState} from 'react';
import '../../Button/ButtonGradient.css';
import ASS_StyleEditUI from './ASS_StyleEditUI';

const ASS_StyleEdit = () => {
  const [input_dir, setInput_dir] = useState('');
  const [suffix, setSuffix] = useState('');
  const [stylename, setStyleName] = useState('');
  const [styleinformation, setStyleInformation] = useState('');
  const [inputText, setInputText] = useState('');

  const handleInputdirChange = (e) => {
      setInput_dir(e.target.value);
  }
  const handleSuffixChange = (e) => {
      setSuffix(e.target.value);
  }
  const handleStyleNameChange = (e) => {
      setStyleName(e.target.value);
  }
  const handleStyleInformationChange = (e) => {
      setStyleInformation(e.target.value);
  }
  // 日志记录 
  let resultLogText = '' // 暂时存储结果文本  
  async function click(input_dir, suffix, stylename, styleinformation) {
    const { ipcRenderer } = window.require('electron')
    const fileinput = await ipcRenderer.invoke('read-directory', input_dir)
    const assFilesInput =  fileinput.filter(file => file.endsWith(suffix))

    for(const file of assFilesInput) {
      const inputdata = [input_dir, file, stylename, styleinformation]
      const logtext = await ipcRenderer.invoke('styleinformation_processing', inputdata)
      if(logtext.success){
          resultLogText += '处理成功，文件名为：' + logtext.file + '\n'
      }
      else{
          resultLogText += '处理失败：' + logtext.error + '\n'
      }
      setInputText(resultLogText)
    }
  }
  return (
    <ASS_StyleEditUI
      handleInputdirChange={handleInputdirChange}
      handleSuffixChange={handleSuffixChange}
      handleStyleNameChange={handleStyleNameChange}
      handleStyleInformationChange={handleStyleInformationChange}
      inputText={inputText}
      onCommit={() => click(input_dir, suffix, stylename, styleinformation)}
      onClear={() => {setInputText('')}}
    />
  )

};
export default ASS_StyleEdit;