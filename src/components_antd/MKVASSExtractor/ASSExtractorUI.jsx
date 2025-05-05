import React, { useState } from 'react';
import { Button, Card, Form, Input, Radio  } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import '../../Button/ButtonGradient.css';
import ASSExtractor from '@/models/MKVASSExtractor/ASSExtractor';

const { TextArea } = Input;

const cardStyle = {
  width: '95%',
  margin: '0 auto'
}


const ASSExtractorUI = () => {
  const models = ASSExtractor();
  const {          
    click,
    onClear,
    inputText,
  } = models;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [suffix, setSuffix] = useState('');
  let defaultlanguage = 'JP'
  const [language, setLanguage] = useState(defaultlanguage);
  
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
  const handleLanguageChange = ({ target: { value } }) => {
      setLanguage(value);
  };
  const formLayout = 'horizontal'
  // 语言单选
  const OptionsLanguage = ['CHS', 'JP'];  
  return (
    <div>
    <Card hoverable style={cardStyle} styles={{ body: { padding: 10, overflow: 'hidden' } }} title="ASS字幕提取">
    <Form
        layout={formLayout}
        initialValues={{ layout: formLayout }}
        style={{ maxWidth: formLayout === 'inline' ? 'none' : 1500 }}
      >
        <Form.Item id='input' label="输入目录">
          <Input placeholder="请输入原ass字幕所在的目录" onChange={handleInputChange}/>
        </Form.Item>
        <Form.Item id='output' label="输出目录">
          <Input placeholder="请选择提取后字幕的输出目录" onChange={handleOutputChange}/>
        </Form.Item>
        <Form.Item id='suffix' label="后缀">
          <Input placeholder="请选择提取字幕的后缀" onChange={handleSuffixChange}/>
        </Form.Item>
        <Form.Item id='language' label="提取语言">
          <Radio.Group options={OptionsLanguage} onChange={handleLanguageChange} value={language} />
        </Form.Item>
        <Form.Item>
          <Button 
            id='commit' 
            className="gradient-button" 
            type="primary" 
            icon={<AntDesignOutlined />} 
            style={{ marginRight: '30px' }}
            onClick={() => click(input, output, suffix, language)}
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
export default ASSExtractorUI;