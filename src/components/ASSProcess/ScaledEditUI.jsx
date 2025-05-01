import React, {useState} from 'react';
import { Button, Card, Form, Input, Radio  } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import '../../Button/ButtonGradient.css';

const { TextArea } = Input;

const cardStyle = {
  width: '95%',
  margin: '0 auto'
};
const ScaleEditUI = ({
  handleInputdirChange,
  handleSuffixChange,
  handleTargetChange,
  onCommit,
  onClear,
  inputText
}) => {
  const formLayout = 'horizontal'
  return (
    <div>
    <Card hoverable style={cardStyle} styles={{ body: { padding: 10, overflow: 'hidden' } }} title="ScaledBorderAndShadow修改工具">
    <Form
        layout={formLayout}
        initialValues={{ layout: formLayout }}
        style={{ maxWidth: formLayout === 'inline' ? 'none' : 1500 }}
      >
        <Form.Item id='input_dir' label="输入目录">
          <Input placeholder="请输入ass字幕所在的目录" onChange={handleInputdirChange}/>
        </Form.Item>
        <Form.Item id='input_suffix' label="后缀">
          <Input placeholder="请输入ass字幕的后缀" onChange={handleSuffixChange}/>
        </Form.Item>
        <Form.Item id='input_target' label="修改目标">
          <Input placeholder="请输入修改目标：yes or no" onChange={handleTargetChange}/>
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
          <TextArea rows={4} value={inputText}/>
        </Form.Item>
        
      </Form>
    </Card>
    <br />
    </div>
  )

};
export default ScaleEditUI;