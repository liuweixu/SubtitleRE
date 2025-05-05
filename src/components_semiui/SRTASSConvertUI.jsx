import React, { useState } from 'react';
import { Form, Button, Row, TextArea } from '@douyinfe/semi-ui';
import '../styles/Button.scss'
import SRTASSConvert from '../models/SRTASSConvert';
import FormChange from './FormChange_folderselector';

const SRTASSConvertUI = () => {
    const {
      inputText,
      click,
      onClear,
  } = SRTASSConvert();
  //获取输入框的目录地址
  const [input, setInput] = useState('');
  const [suffix, setSuffix] = useState('');
  const [output, setOutput] = useState('');
  const [style, setStyle] = useState('');
  
  const handleInputChange = (value, e) => {
    setInput(value);
  }
  const handleSuffixChange = (value, e) => {
    setSuffix(value);
  }
  const handleOutputChange = (value, e) => {
    setOutput(value);
  }
  const handleStyleChange = (value, e) => {
    setStyle(value);
  }
  return (
    <Form
        labelCol={{ span: 10 }}
        labelPosition='inset'
        labelAlign='right'
    >
        <Form.Input id='srt_input' field='srtInputDir' style={{ width: '95%' }} 
                    label='SRT输入目录' trigger='blur' 
                    placeholder='请输入SRT字幕所在目录' onChange={handleInputChange}/>
        <FormChange
            field_name={'srtInputDir'}
            setInput={setInput}
        />
        <Form.Input id='suffix' field='srtSuffix' style={{ width: '95%', marginTop: '10px' }} 
                    label='后缀' trigger='blur' 
                    placeholder='请输入SRT字幕的后缀' onChange={handleSuffixChange}/>
        <Form.Input id='output' field='assOuputDir' style={{ width: '95%' }} 
                    label='ASS输出目录' trigger='blur' 
                    placeholder='请输入转换后的ASS字幕的输出目录' onChange={handleOutputChange}/>
        <FormChange
            field_name={'assOuputDir'}
            setInput={setOutput}
        />
        <Form.Input id='style' field='styleInformation' style={{ width: '95%', marginTop: '10px' }} 
                    label='样式信息' trigger='blur' 
                    placeholder='请输入目标样式' onChange={handleStyleChange}/>
        <Row>
            <Button type="primary"
                    htmlType="submit" 
                    className="primary-button" 
                    style={{marginRight: '30px', marginTop: '10px'}}
                    onClick={() => click(input, suffix, output, style)}
            >
                确认
            </Button>
            <Button htmlType="reset" className="primary-button" style={{marginRight: '30px', marginTop: '10px'}}>
                重置
            </Button>

        </Row>
            <TextArea rows={10} style={{marginTop: '20px', marginBottom: '30px'}} value={inputText}/>
            <Button htmlType="reset" className="primary-button" onClick={onClear}>
                    清空
            </Button>
    </Form>
  )
};

export default SRTASSConvertUI;