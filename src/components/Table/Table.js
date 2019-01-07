import React, { Component } from 'react';
import { Row, Col,Icon } from 'antd';
import classNames from 'classnames';
import './Table.scss';
const electron = window.require("electron");
const { ipcRenderer } = electron;
const iconStyle = {
  marginLeft:'12px',
  cursor:'pointer'
}

export default class Table extends Component {
  render() {
    const {data} = this.props;
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
    return items;
  }
}
