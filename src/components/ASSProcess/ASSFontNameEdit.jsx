import React, {useState} from 'react';
import '../../Button/ButtonGradient.css';
import ASSFontNameEditUI from './ASSFontNameEditUI';


const ASSFontNameEdit = () => {
  const [input_dir, setInput_dir] = useState('');
  const [suffix, setSuffix] = useState('');
  const [style, setStyle] = useState('');
  const [fontname, setFontname] = useState('');
  const [inputText, setInputText] = useState('');

  const handleInputdirChange = (e) => {
      setInput_dir(e.target.value);
  }
  const handleSuffixChange = (e) => {
      setSuffix(e.target.value);
  }
  const handleStyleChange = (e) => {
      setStyle(e.target.value);
  }
  const handleFontChange = (e) => {
      setFontname(e.target.value);
  }

  // 日志记录 
  let resultLogText = '' // 暂时存储结果文本  
  async function click(input_dir, suffix, style, fontname) {
    const { ipcRenderer } = window.require('electron')
    const fileinput = await ipcRenderer.invoke('read-directory', input_dir)
    const assFilesInput =  fileinput.filter(file => file.endsWith(suffix))

    for(const file of assFilesInput) {
      const inputdata = [input_dir, file, style, fontname]
      const logtext = await ipcRenderer.invoke('fontname_processing', inputdata)
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
    <ASSFontNameEditUI 
      handleInputdirChange={handleInputdirChange}
      handleSuffixChange={handleSuffixChange}
      handleStyleChange={handleStyleChange}
      handleFontChange={handleFontChange}
      inputText={inputText}
      onCommit={() => click(input_dir, suffix, style, fontname)}
      onClear={() => {setInputText('')}}
    />
  )

};
export default ASSFontNameEdit;