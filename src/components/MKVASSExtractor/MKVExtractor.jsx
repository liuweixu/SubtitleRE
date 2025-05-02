import React, {useState} from 'react';
import '../../Button/ButtonGradient.css';
import MKVExtractorUI from './MKVExtractorUI';

const MKVExtractor = () => {

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [track, setTrack] = useState('');
    const [language, setLanguage] = useState('');
    const [inputText, setInputText] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }
    const handleOutputChange = (e) => {
        setOutput(e.target.value)
    }
    const handleTrackChange = (e) => {
        setTrack(e.target.value);
    }
    //关键
    const handleLanguageChange = (value) => {
        setLanguage(value)
    }

    // 日志记录 
    let resultLogText = '' // 暂时存储结果文本
    // 点击按钮后触发
    async function click(input, output, track, language) {
        const { ipcRenderer } = window.require('electron')
        const fileinput = await ipcRenderer.invoke('read-directory', input)
        // const assFilesInput =  fileinput.filter(file => file.toLowerCase().endsWith(suffix))

    }

    return (
    <MKVExtractorUI
        handleInputChange={handleInputChange}
        handleOutputChange={handleOutputChange}
        handleTrackChange={handleTrackChange}
        handleLanguageChange={handleLanguageChange}
        onCommit={() => click(input, output, track, language)}
        onClear={() => setInputText('')}
        inputText={inputText}
    />
  )
};
export default MKVExtractor;