import React, { useState } from 'react';
import {Form} from 'antd';
import '../Button/ButtonGradient.css';
import FormUI from './SRTAndASSAlignFormUI';


const App = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  //获取输入框的目录地址
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [output, setOutput] = useState('');
  const [srtsuffix, setSrtsuffix] = useState('');
  const [asssuffix, setAsssuffix] = useState('');
  const handleInput1Change = (e) => {
    setInput1(e.target.value);
  }
  const handleInput2Change = (e) => {
    setInput2(e.target.value);
  }
  const handleOutputChange = (e) => {
    setOutput(e.target.value);
  }
  const handleSrtsuffixChange = (e) => {
    setSrtsuffix(e.target.value);
  }
  const handleAsssuffixChange = (e) => {
    setAsssuffix(e.target.value);
  }

  // 日志记录
  const [inputText, setInputText] = useState('');
  let resultLogText = '' // 暂时存储结果文本
  // 点击按钮后触发
  async function click(input1, input2, output, srtsuffix, asssuffix) {
    try {
        const { ipcRenderer } = window.require('electron')
        const fileInput1 = await ipcRenderer.invoke('read-directory', input1)
        const srtFilesInput1 =  fileInput1.filter(file => file.toLowerCase().endsWith(srtsuffix))
        const fileInput2 = await ipcRenderer.invoke('read-directory', input2)
        const srtFilesInput2 =  fileInput2.filter(file => file.toLowerCase().endsWith(asssuffix))
        
        // 获取基础文件名
        const getBaseName = (filename) => filename.split('.')[0];
        
        // 查找匹配的文件对
        const pairs = [];
        for (const jpFile of srtFilesInput1) {
            const baseJp = getBaseName(jpFile);
            for (const cnFile of srtFilesInput2) {
                const baseCn = getBaseName(cnFile);
                if (baseJp === baseCn) {
                    pairs.push([jpFile, cnFile]);
                    break;
                }
            }
        }
        //保存对齐失败信息
        let alignfails = []
        for (const pair of pairs) {
          const inputAlign = [pair[0], pair[1], input1, input2, output]
          const logtext = await ipcRenderer.invoke('align_processing', inputAlign)
          if (logtext.success) {
            resultLogText += `${pair[0]} 对齐成功!\n`
          } else {
            alignfails.push(`${pair[0]} 对齐失败: ${logtext.error}\n`)
          }
          setInputText(resultLogText)
        }
        if (alignfails.length > 0) {
          resultLogText += `\n\n以下文件对齐失败：\n${alignfails.join('\n')}`
          setInputText(resultLogText)
        }
    } catch (err) {
        console.error('读取目录出错:', err)
    }
  }
  return (
    <FormUI 
      formLayout={formLayout}
      form={form}
      onFormLayoutChange={onFormLayoutChange}
      handleInput1Change={handleInput1Change}
      handleInput2Change={handleInput2Change}
      handleOutputChange={handleOutputChange}
      handleSrtsuffixChange={handleSrtsuffixChange}
      handleAsssuffixChange={handleAsssuffixChange}
      inputText={inputText}
      onCommit={() => click(input1, input2, output, srtsuffix, asssuffix)}
      onClear={() => setInputText('')}
    />
  );
};
export default App;