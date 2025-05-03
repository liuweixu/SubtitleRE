import React, { useState } from 'react';
import { Button, Form, Input, Radio, Progress } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import '../Button/ButtonGradient.css';
import SRTAndASSAlign from '../models/SRTAndASSAlign'

const { TextArea } = Input;

const SRTAndASSAlignUI = () => {
  const models = SRTAndASSAlign();
  const {
    inputText,
    click,
    onClear,
    progress_percent
  } = models;
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
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  return (
    <Form
      layout={formLayout}
      form={form}
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
      style={{ maxWidth: formLayout === 'inline' ? 'none' : 1500 }}
    >
      <Form.Item label="布局选择" name="layout">
        <Radio.Group value={formLayout}>
          <Radio.Button value="horizontal">横向布局</Radio.Button>
          <Radio.Button value="vertical">竖向布局</Radio.Button>
          {/* <Radio.Button value="inline">Inline</Radio.Button> */}
        </Radio.Group>
      </Form.Item>
      <Form.Item id='input1' label="SRT输入目录">
        <Input placeholder="请输入日语SRT字幕所在目录" onChange={handleInput1Change}/>
      </Form.Item>
      <Form.Item id='input2' label="ASS输入目录">
        <Input placeholder="请输入中文ASS字幕所在的目录" onChange={handleInput2Change}/>
      </Form.Item>
      <Form.Item id='output' label="输出目录">
        <Input placeholder="请输入对齐后日语SRT字幕所在的目录" onChange={handleOutputChange}/>
      </Form.Item>
      <Form.Item layout='horizontal' label="SRT和ASS字幕后缀">
        <Input 
          placeholder='SRT字幕后缀选择，例如：.jp.srt' 
          id='srtsuffix' style={{ width: '45%', marginRight: '10px' }} 
          onChange={handleSrtsuffixChange}
        />
        <Input 
          placeholder='ASS字幕后缀选择，例如：.chs.ass' 
          id='asssuffix' style={{ width: '45%' }} 
          onChange={handleAsssuffixChange}
        />
      </Form.Item>
      <Form.Item>
        <Button 
          id='commit' 
          className="gradient-button" 
          type="primary" 
          icon={<AntDesignOutlined />} 
          style={{ marginRight: '30px' }}
          onClick={() => click(input1, input2, output, srtsuffix, asssuffix)}
        >
          确定进行
        </Button>
        <Button 
          id='clear' 
          className="gradient-button" 
          type="primary" 
          icon={<AntDesignOutlined />} 
          onClick={onClear}
        >
          清空日志
        </Button>
      </Form.Item>
      <Form.Item>
        <Progress percent={progress_percent} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
        <TextArea rows={20} value={inputText}/>
      </Form.Item>
      
    </Form>
    
  );
};

export default SRTAndASSAlignUI;