import React, {useState} from 'react';
import '../../Button/ButtonGradient.css';
import ScaleEditUI from './ScaledEditUI';

const ScaleEdit = () => {

    const [input_dir, setInput_dir] = useState('');
    const [suffix, setSuffix] = useState('');
    const [target, setTarget] = useState('');
    const [inputText, setInputText] = useState('');

    const handleInputdirChange = (e) => {
        setInput_dir(e.target.value);
    }
    const handleSuffixChange = (e) => {
        setSuffix(e.target.value);
    }
    const handleTargetChange = (e) => {
        setTarget(e.target.value);
    }

    // 日志记录 
    let resultLogText = '' // 暂时存储结果文本
    // 点击按钮后触发
    async function click(input_dir, suffix, target) {
        const { ipcRenderer } = window.require('electron')
        const fileinput = await ipcRenderer.invoke('read-directory', input_dir)
        const assFilesInput =  fileinput.filter(file => file.toLowerCase().endsWith(suffix))

        for (const file of assFilesInput) {
            const inputdata = [input_dir, file, target]
            const logtext = await ipcRenderer.invoke('scaled_processing', inputdata)
            if(logtext.success){
                resultLogText += '处理成功，文件名为：' + logtext.file + '\n'
            }
            else{
                resultLogText += '处理失败：' + logtext.error + '\n'
            }
        }
        setInputText(resultLogText)
    }

    return (
    <ScaleEditUI
      handleInputdirChange={handleInputdirChange}
      handleSuffixChange={handleSuffixChange}
      handleTargetChange={handleTargetChange}
      onCommit={() => click(input_dir, suffix, target)}
      onClear={() => setInputText('')}
      inputText={inputText}
    />
  )
};
export default ScaleEdit;