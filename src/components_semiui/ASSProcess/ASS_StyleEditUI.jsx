import React, { useState } from 'react';
import { Form, Button, Row, TextArea, Card, Select } from '@douyinfe/semi-ui';
import '../../styles/Button.scss'
import Ass_StyleEdit from '../../models/ASSProcess/ASS_StyleEdit';
import FormChange from '../FormChange_folderselector'

const cardStyle = {
  width: '95%',
  margin: '0 auto'
}


const Ass_StyleEditUI = () => {
  const {          
    click,
    onClear,
    inputText,
  } = Ass_StyleEdit();
  const [input_dir, setInput_dir] = useState('');
  const [suffix, setSuffix] = useState('');
  const [stylename, setStyleName] = useState('');
  const [styleinformation, setStyleInformation] = useState('');
  
  const handleInputdirChange = (value, e) => {
      setInput_dir(value);
  }
  const handleSuffixChange = (value, e) => {
      setSuffix(value);
  }
  const handleStyleNameChange = (value, e) => {
    setStyleName(value);
}
const handleStyleInformationChange = (value, e) => {
    setStyleInformation(value);
}
  return (
    <div>
      <Card hoverable style={cardStyle} styles={{ body: { padding: 10, overflow: 'hidden' } }} title="ASS样式信息修改工具">
        <Form
            labelCol={{ span: 10 }}
            labelPosition='inset'
            labelAlign='right'
        >
            <Form.Input id='input-dir' field='inputDir' style={{ width: '95%' }} 
                        label='输入目录' trigger='blur' 
                        placeholder='请输入原ass字幕所在的目录' onChange={handleInputdirChange}/>
            <FormChange
                field_name={'inputDir'}
                setInput={setInput_dir}
            />
            <Form.Input id='suffix' field='assSuffix' style={{ width: '95%' }} 
                        label='后缀' trigger='blur' 
                        placeholder='请输入ass字幕的后缀' onChange={handleSuffixChange}/>
            <Form.Input id='style_name' field='styleName' style={{ width: '95%' }} 
                        label='样式名称' trigger='blur' 
                        placeholder='请输入修改的样式名称' onChange={handleStyleNameChange}/>
            <Form.Input id='style_information' field='styleInformation' style={{ width: '95%' }} 
                        label='样式信息' trigger='blur' 
                        placeholder='请输入修改后的样式信息' onChange={handleStyleInformationChange}/>
            <Row>
                <Button type="primary"
                        htmlType="submit" 
                        className="primary-button" 
                        style={{marginRight: '30px', marginTop: '30px'}}
                        onClick={() => click(input_dir, suffix, stylename, styleinformation)}
                >
                    确认
                </Button>
                <Button htmlType="reset" className="primary-button" style={{marginRight: '30px', marginTop: '30px'}}>
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
export default Ass_StyleEditUI;