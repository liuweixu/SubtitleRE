import React from 'react';
import { Button, Form, Input, Radio, Progress } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import '../Button/ButtonGradient.css';

const { TextArea } = Input;

const FormUI = ({ 
  formLayout, 
  form,
  onFormLayoutChange, 
  handleInput1Change,
  handleInput2Change,
  handleOutputChange,
  handleSrtsuffixChange,
  handleAsssuffixChange,
  inputText,
  onCommit,
  onClear,
  progress_percent
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
        <Progress percent={progress_percent} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
        <TextArea rows={20} value={inputText}/>
      </Form.Item>
      
    </Form>
    
  );
};

export default FormUI;