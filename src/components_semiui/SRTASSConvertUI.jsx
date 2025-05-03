import React, { useState } from 'react';
import { Form, Button, Row, TextArea } from '@douyinfe/semi-ui';
import '../styles/Button.scss'
import SRTASSConvert from '../models/SRTASSConvert';

const { TextArea } = Input;

const SRTASSConvertUI = () => {
    const {
      inputText,
      click,
      onClear,
      progress_percent
  } = SRTASSConvert();
  //获取输入框的目录地址
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [output, setOutput] = useState('');
  const [srtsuffix, setSrtsuffix] = useState('');
  const [asssuffix, setAsssuffix] = useState('');
  const handleInput1Change = (value, e) => {
      setInput1(value);
  }
  const handleInput2Change = (value, e) => {
      setInput2(value);
  }
  const handleOutputChange = (value, e) => {
      setOutput(value);
  }
  const handleSrtsuffixChange = (value, e) => {
      setSrtsuffix(value);
  }
  const handleAsssuffixChange = (value, e) => {
      setAsssuffix(value);
  }
  return (
      <Form
          // wrapperCol={{ span: 20 }}
          labelCol={{ span: 10 }}
          labelPosition='inset'
          labelAlign='right'
      >
          <Form.Input id='input1' field='srtInputDir' style={{ width: '95%' }} 
                      label='SRT输入目录' trigger='blur' 
                      placeholder='请输入日语SRT字幕所在目录' onChange={handleInput1Change}/>
          <Form.Input id='input2' field='assInputDir' style={{ width: '95%' }} 
                      label='ASS输入目录' trigger='blur' 
                      placeholder='请输入中文ASS字幕所在的目录' onChange={handleInput2Change}/>
          <Form.Input id='output' field='srtOuputDir' style={{ width: '95%' }} 
                      label='SRT输出目录' trigger='blur' 
                      placeholder='请输入对齐后日语SRT字幕所在的目录' onChange={handleOutputChange}/>
          {/* <Form labelPosition='inset' labelAlign='right' layout='horizontal'> */}
          <Row>
          <Form.Input id='srtsuffix' field='srtsuffix' style={{ width: '40%' }} 
                      label='SRT字幕后缀' trigger='blur' placeholder='例如：.jp.srt' onChange={handleSrtsuffixChange}/>
          <Form.Input id='asssuffix' field='sssuffix' style={{ width: '40%' }} 
                      label='ASS字幕后缀' trigger='blur' placeholder='例如：.sc.ass' onChange={handleAsssuffixChange}/>
        </Row>
          <Row>
              <Button type="primary"
                      htmlType="submit" 
                      className="primary-button" 
                      style={{marginRight: '30px'}}
                      onClick={() => click(input1, input2, output, srtsuffix, asssuffix)}
              >
                  确认
              </Button>
              <Button htmlType="reset" className="primary-button" style={{marginRight: '30px'}}>
                  重置
              </Button>

          </Row>
              <TextArea rows={10} style={{marginTop: '30px', marginBottom: '30px'}} value={inputText}/>
              <Button htmlType="reset" className="primary-button" onClick={onClear}>
                      清空
              </Button>
      </Form>
  )
};

export default SRTASSConvertUI;