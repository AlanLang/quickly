import React, { Component } from 'react';
import { Row, Col,Icon, Input, Select } from 'antd';

import classNames from 'classnames';
import './Table.scss';
const electron = window.require("electron");
const { ipcRenderer } = electron;
const Option = Select.Option;
const iconStyle = {
  marginLeft:'12px',
  cursor:'pointer'
}

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding:false,
    };
  }
  onAdd = () => {
    this.setState({
      isAdding:true
    })
  }
  render() {
    const {data} = this.props;
    const {isAdding} = this.state;
    const items = [];
    data.forEach(item => {
      items.push(<Row key={item._id}>
        <Col className="gutter-row" span={4}>{item.code}</Col>
        <Col className="gutter-row" span={4}>{item.title}</Col>
        <Col className="gutter-row" span={8}>{item.value}</Col>
        <Col className="gutter-row" span={4}>{item.type}</Col>
        <Col className="gutter-row" span={4}><Icon style={iconStyle} onClick={this.onEdit} type="edit" /><Icon type="delete" style={iconStyle} /></Col>
      </Row>)
    });
    if(isAdding){
      items.push(<Row key='adding'>
      <Col className="gutter-row" span={4}><Input placeholder="指令" /></Col>
        <Col className="gutter-row" span={4}><Input placeholder="标题" /></Col>
        <Col className="gutter-row" span={8}><Input placeholder="地址" /></Col>
        <Col className="gutter-row" span={4}>
          <Select defaultValue="网址">
            <Option value="网址">网址</Option>
            <Option value="程序">程序</Option>
            <Option value="路径">路径</Option>
          </Select>
        </Col>
        <Col className="gutter-row" span={4}><Icon type="delete" style={iconStyle} /></Col>
    </Row>)
    }else{
      items.push(<Row key='add'>
      <Col className="gutter-add" onClick={this.onAdd} span={24}><Icon style={{marginRight:'6px'}} type="plus" />添加</Col>
    </Row>)
    }
    return items;
  }
}
