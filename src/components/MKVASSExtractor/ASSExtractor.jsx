import React, {useState} from 'react';
import '../../Button/ButtonGradient.css';
import ASSExtractorUI from './ASSExtractorUI';

const ASSExtractor = () => {

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [suffix, setSuffix] = useState('');
    let defaultlanguage = 'JP'
    const [language, setLanguage] = useState(defaultlanguage);
    const [inputText, setInputText] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }
    const handleOutputChange = (e) => {
        setOutput(e.target.value)
    }
    const handleSuffixChange = (e) => {
        setSuffix(e.target.value);
    }
    //关键
    const handleLanguageChange = (value) => {
        setLanguage(value)
    }

    // 日志记录 
    let resultLogText = '' // 暂时存储结果文本
    // 点击按钮后触发
    async function click(input, output, suffix, language) {
        const { ipcRenderer } = window.require('electron')
        const fileinput = await ipcRenderer.invoke('read-directory', input)
        const assFilesInput =  fileinput.filter(file => file.endsWith(suffix))
        // 获取基础文件名
        const getBaseName = (filename) => filename.split('.')[0];
        
        for(const file of assFilesInput) {
            const basename = getBaseName(file)
            const inputdata = [input, file, output, language, basename]
            const logtext = await ipcRenderer.invoke('assextractor_processing', inputdata)
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
    <ASSExtractorUI
        handleInputChange={handleInputChange}
        handleOutputChange={handleOutputChange}
        handleSuffixChange={handleSuffixChange}
        handleLanguageChange={handleLanguageChange}
        onCommit={() => click(input, output, suffix, language)}
        onClear={() => setInputText('')}
        inputText={inputText}
        defaultlanguage={defaultlanguage}
    />
  )
};
export default ASSExtractor;