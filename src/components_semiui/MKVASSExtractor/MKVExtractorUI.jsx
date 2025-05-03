import React, { useState } from 'react';
import { Form, Button, Row, TextArea, Card, RadioGroup, Radio, Progress } from '@douyinfe/semi-ui';
import '../../styles/Button.scss'
import MKVExtractor from '../../models/MKVASSExtractor/MKVExtractor';


const cardStyle = {
  width: '95%',
  margin: '0 auto'
}

const MKVExtractorUI = () => {
  const {          
    click,
    onClear,
    inputText,
    progress_percent
  } = MKVExtractor();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [track, setTrack] = useState('');
  let defaultlanguage = "JP"
  const [language, setLanguage] = useState(defaultlanguage);
  
  const handleInputChange = (value, e) => {
      setInput(value);
  }
  const handleOutputChange = (value, e) => {
      setOutput(value)
  }
  const handleTrackChange = (value, e) => {
    setTrack(value);
}
  //关键
  const handleLanguageChange = (e) => {
      setLanguage(e.target.value);
  };
  const strokeArr = [
    { percent: 0, color: 'rgb(255, 238, 0)' },
    { percent: 50, color: 'rgb(60, 255, 0)' },
    { percent: 100, color: 'rgb(0, 217, 255)' },
  ];
  return (
    <div>
      <Card hoverable style={cardStyle} styles={{ body: { padding: 10, overflow: 'hidden' } }} title="MKV字幕提取">
        <Form
            // wrapperCol={{ span: 20 }}
            labelCol={{ span: 10 }}
            labelPosition='inset'
            labelAlign='right'
        >
            <Form.Input id='input' field='inputDir' style={{ width: '95%' }} 
                        label='输入目录' trigger='blur' 
                        placeholder='请输入原ass字幕所在的目录' onChange={handleInputChange}/>
            <Form.Input id='output' field='outputDir' style={{ width: '95%' }} 
                        label='输出目录' trigger='blur' 
                        placeholder='请选择提取后字幕的输出目录' onChange={handleOutputChange}/>
            <Form.Input id='track' field='track' style={{ width: '95%' }} 
                        label='字幕轨道' trigger='blur' 
                        placeholder='请选择字幕轨道' onChange={handleTrackChange}/>
            <RadioGroup onChange={handleLanguageChange} value={language} aria-label="提取语言" name="radio-language" 
                        style={{marginBottom: '15px', marginTop: '10px'}}>
              <Radio value={"CHS"}>CHS</Radio>
              <Radio value={"JP"}>JP</Radio>
            </RadioGroup>
            <Row>
                <Button type="primary"
                        htmlType="submit" 
                        className="primary-button" 
                        style={{marginRight: '30px'}}
                        onClick={() => click(input, output, track, language)}
                >
                    确认
                </Button>
                <Button htmlType="reset" className="primary-button" style={{marginRight: '30px'}}>
                    重置
                </Button>

            </Row>
                <Progress
                    percent={progress_percent}
                    stroke={strokeArr}
                    strokeGradient={true}
                    showInfo
                    size="large"
                    aria-label="file download speed"
                    style={{marginTop: '15px'}}
                />
                <TextArea rows={10} style={{marginTop: '10px', marginBottom: '30px'}} value={inputText}/>
                <Button htmlType="reset" className="primary-button" onClick={onClear}>
                        清空
                </Button>
        </Form>
      </Card>
    </div>
  )

};
export default MKVExtractorUI;