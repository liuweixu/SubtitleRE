import React from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import '../Button/ButtonGradient.css';

const { TextArea } = Input;

const SRTASSConvertUI = ({ 
  formLayout, 
  form,
  onFormLayoutChange, 
  handleInputChange,
  handleSuffixChange,
  handleOutputChange,
  handleStyleChange,
  inputText,
  onCommit,
  onClear
}) => {
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
          onClick={onCommit}
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