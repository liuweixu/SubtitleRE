import React, {useState} from 'react';
import { Button, Card, Form, Input, Radio  } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import '../../Button/ButtonGradient.css';
import ASSFontNameEdit from '@/models/ASSProcess/ASSFontNameEdit';

const { TextArea } = Input;

const cardStyle = {
  width: '95%',
  margin: '0 auto'
};
const ASSFontNameEditUI = () => {
  const models = ASSFontNameEdit();
  const { 
    click,
    onClear,
    inputText
  } = models;
  const formLayout = 'horizontal'
  const [input_dir, setInput_dir] = useState('');
  const [suffix, setSuffix] = useState('');
  const [style, setStyle] = useState('');
  const [fontname, setFontname] = useState('');
  
  const handleInputdirChange = (e) => {
      setInput_dir(e.target.value);
  }
  const handleSuffixChange = (e) => {
      setSuffix(e.target.value);
  }
  const handleStyleChange = (e) => {
      setStyle(e.target.value);
  }
  const handleFontChange = (e) => {
      setFontname(e.target.value);
  }
  return (
    <div>
    <Card hoverable style={cardStyle} styles={{ body: { padding: 10, overflow: 'hidden' } }} title="ASS字体名称修改工具">
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
        <Form.Item id='input_style' label="样式名称">
          <Input placeholder="请输入修改的样式名称" onChange={handleStyleChange}/>
        </Form.Item>
        <Form.Item id='input_font' label="修改字体">
          <Input placeholder="请输入修改后的字体名称" onChange={handleFontChange}/>
        </Form.Item>
        <Form.Item>
          <Button 
            id='commit' 
            className="gradient-button" 
            type="primary" 
            icon={<AntDesignOutlined />} 
            style={{ marginRight: '30px' }}
            onClick={() => click(input_dir, suffix, style, fontname)}
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
export default ASSFontNameEditUI;