import React, { useState } from 'react';
import { Form, Button, Row, TextArea, Card, RadioGroup, Radio } from '@douyinfe/semi-ui';
import '@/styles/Button.scss'
import ASSExtractor from '@/models/MKVASSExtractor/ASSExtractor';

import FormChange from '../FormChange_folderselector'

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
  let defaultlanguage = "JP"
  const [language, setLanguage] = useState(defaultlanguage);
  
  const handleInputChange = (value, e) => {
      setInput(value);
  }
  const handleOutputChange = (value, e) => {
      setOutput(value)
  }
  const handleSuffixChange = (value, e) => {
      setSuffix(value);
  }
  //关键
  const handleLanguageChange = (e) => {
      setLanguage(e.target.value);
  };
  return (
    <div>
      <Card hoverable style={cardStyle} styles={{ body: { padding: 10, overflow: 'hidden' } }} title="ASS字幕提取">
        <Form
            // wrapperCol={{ span: 20 }}
            labelCol={{ span: 10 }}
            labelPosition='inset'
            labelAlign='right'
        >
            <Form.Input id='input' field='inputDir' style={{ width: '95%' }} 
                        label='输入目录' trigger='blur' 
                        placeholder='请输入原ass字幕所在的目录' onChange={handleInputChange}/>
            <FormChange
                field_name={'inputDir'}
                setInput={setInput}
            />
            <Form.Input id='output' field='outputDir' style={{ width: '95%' }} 
                        label='输出目录' trigger='blur' 
                        placeholder='请选择提取后字幕的输出目录' onChange={handleOutputChange}/>
            <FormChange
                field_name={'outputDir'}
                setInput={setOutput}
            />
            <Form.Input id='suffix' field='assSuffix' style={{ width: '95%' }} 
                        label='后缀' trigger='blur' 
                        placeholder='请选择提取字幕的后缀' onChange={handleSuffixChange}/>
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
                        onClick={() => click(input, output, suffix, language)}
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
      </Card>
    </div>
  )

};
export default ASSExtractorUI;