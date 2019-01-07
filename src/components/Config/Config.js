import React, { Component } from 'react';
import { Button } from 'antd';
import Table from '../Table/Table'
import classNames from 'classnames';
import './Config.scss';
const electron = window.require("electron");
const { ipcRenderer } = electron;
export default class Config extends Component {
  onCancel= () => {
    ipcRenderer.send('asynchronous-message', 'home')
  }
  render() {
    const {data} = this.props;
    return (
      <div className='config-container'>
        <div className='paths'>
          <Table data={data}></Table>
        </div>
        <div className='buttons'>
          <Button onClick={this.onCancel}>取消</Button>
          <Button type="primary">保存</Button>
        </div>
      </div>
    );
  }
}
