import React, { useState } from 'react';
import {Form} from 'antd';
import '../Button/ButtonGradient.css';
import SRTASSConvertUI from './SRTASSConvertUI';


const SRTASSConvert = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  //获取输入框的目录地址
  const [input, setInput] = useState('');
  const [suffix, setSuffix] = useState('');
  const [output, setOutput] = useState('');
  const [style, setStyle] = useState('');
  const [inputText, setInputText] = useState('');
  const handleInputChange = (e) => {
    setInput(e.target.value);
  }
  const handleSuffixChange = (e) => {
    setSuffix(e.target.value);
  }
  const handleOutputChange = (e) => {
    setOutput(e.target.value);
  }
  const handleStyleChange = (e) => {
    setStyle(e.target.value);
  }

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
  return (
    <SRTASSConvertUI 
      formLayout={formLayout}
      form={form}
      onFormLayoutChange={onFormLayoutChange}
      handleInputChange={handleInputChange}
      handleOutputChange={handleOutputChange}
      handleSuffixChange={handleSuffixChange}
      handleStyleChange={handleStyleChange}
      inputText={inputText}
      onCommit={() => click(input, suffix, output, style)}
      onClear={() => setInputText('')}
    />
  );
};
export default SRTASSConvert;