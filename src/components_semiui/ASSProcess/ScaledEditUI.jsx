import React, { useState } from 'react';
import { Form, Button, Row, TextArea, Card, Select } from '@douyinfe/semi-ui';
import '../../styles/Button.scss'
import { IconVigoLogo, IconGift } from '@douyinfe/semi-icons';
import ScaleEdit from '../../models/ASSProcess/ScaledEdit';


const cardStyle = {
  width: '95%',
  margin: '0 auto'
}


const ScaleEditUI = () => {
  const {          
    click,
    onClear,
    inputText,
  } = ScaleEdit();
  const [input_dir, setInput_dir] = useState('');
  const [suffix, setSuffix] = useState('');
  const [target, setTarget] = useState('');
  
  const handleInputdirChange = (value, e) => {
      setInput_dir(value);
  }
  const handleSuffixChange = (value, e) => {
      setSuffix(value);
  }
  //关键
  const handleTargetChange = (value) => {
      setTarget(value);
  }

  return (
    <div>
      <Card hoverable style={cardStyle} styles={{ body: { padding: 10, overflow: 'hidden' } }} title="ScaledBorderAndShadow修改工具">
        <Form
            // wrapperCol={{ span: 20 }}
            labelCol={{ span: 10 }}
            labelPosition='inset'
            labelAlign='right'
        >
            <Form.Input id='input-dir' field='inputDir' style={{ width: '95%' }} 
                        label='输入目录' trigger='blur' 
                        placeholder='请输入原ass字幕所在的目录' onChange={handleInputdirChange}/>
            <Form.Input id='suffix' field='assSuffix' style={{ width: '95%' }} 
                        label='后缀' trigger='blur' 
                        placeholder='请输入ass字幕的后缀' onChange={handleSuffixChange}/>
            {/* <Form.Input id='target' field='target' style={{ width: '95%' }} 
                        label='后缀' trigger='blur' 
                        placeholder='请选择提取字幕的后缀' onChange={handleSuffixChange}/> */}
            <Select
                style={{ width: '320px', marginTop: '15px'}}
                defaultValue={'yes'}
                prefix={<IconVigoLogo />}
                suffix={<IconGift />}
                showArrow={false}
                onChange={handleTargetChange}
            >
                <Select.Option value="yes">Yes</Select.Option>
                <Select.Option value="no">No</Select.Option>
            </Select>
            <Row>
                <Button type="primary"
                        htmlType="submit" 
                        className="primary-button" 
                        style={{marginRight: '30px', marginTop: '30px'}}
                        onClick={() => click(input_dir, suffix, target)}
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
export default ScaleEditUI;