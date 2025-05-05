import React, { useState } from 'react';
import { Button, Card, Form, Input, Select  } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import '../../Button/ButtonGradient.css';
import ScaleEdit from '@/models/ASSProcess/ScaledEdit';

const { TextArea } = Input;

const cardStyle = {
  width: '95%',
  margin: '0 auto'
};
const ScaleEditUI = () => {
  const models = ScaleEdit();
  const {
    click,
    onClear,
    inputText
  } = models;
  const [input_dir, setInput_dir] = useState('');
  const [suffix, setSuffix] = useState('');
  const [target, setTarget] = useState('');

  const handleInputdirChange = (e) => {
      setInput_dir(e.target.value);
  }
  const handleSuffixChange = (e) => {
      setSuffix(e.target.value);
  }
  //关键
  const handleTargetChange = (value) => {
      setTarget(value);
  }
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
          <Select
            defaultValue={{ value: 'yes', label: 'yes' }}
            style={{ width: 120 }}
            onChange={handleTargetChange}
            options={[
              {
                value: 'yes',
                label: 'yes',
              },
              {
                value: 'no',
                label: 'no',
              },
            ]}
          />
        </Form.Item>
        <Form.Item>  
          <Button 
            id='commit' 
            className="gradient-button" 
            type="primary" 
            icon={<AntDesignOutlined />} 
            style={{ marginRight: '30px' }}
            onClick={() => click(input_dir, suffix, target)}
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