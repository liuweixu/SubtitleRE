import React, { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import '../Button/ButtonGradient.css';
import SRTASSConvert from '../models/SRTASSConvert';  

const { TextArea } = Input;

const SRTASSConvertUI = () => {
  const models = SRTASSConvert();
  const {
    inputText,
    click,
    onClear
  } = models;
  //获取输入框的目录地址
  const [input, setInput] = useState('');
  const [suffix, setSuffix] = useState('');
  const [output, setOutput] = useState('');
  const [style, setStyle] = useState('');
  
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
        </Radio.Group>
      </Form.Item>
      <Form.Item id='input1' label="SRT输入目录">
        <Input placeholder="请输入SRT字幕所在目录" onChange={handleInputChange}/>
      </Form.Item>
      <Form.Item id='suffix' label="后缀">
        <Input placeholder="请输入SRT字幕的后缀" onChange={handleSuffixChange}/>
      </Form.Item>
      <Form.Item id='output' label="ASS输出目录">
        <Input placeholder="请输入转换后的ASS字幕的输出目录" onChange={handleOutputChange}/>
      </Form.Item>
      <Form.Item id='styleinformation' label="样式信息">
        <Input placeholder="请输入目标样式" onChange={handleStyleChange}/>
      </Form.Item>
      <Form.Item>
        <Button 
          id='commit' 
          className="gradient-button" 
          type="primary" 
          icon={<AntDesignOutlined />} 
          style={{ marginRight: '30px' }}
          onClick={() => click(input, suffix, output, style)}
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
        <TextArea rows={20} value={inputText}/>
      </Form.Item>
      
    </Form>
    
  );
};

export default SRTASSConvertUI;