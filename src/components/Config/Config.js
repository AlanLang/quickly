import React, { Component } from 'react';
import { Icon } from 'antd';
import Table from '../Table/Table'
import classNames from 'classnames';
import './Config.scss';
const electron = window.require("electron");
const { ipcRenderer } = electron;
export default class Config extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
  }
  onCancel= () => {
    ipcRenderer.send('asynchronous-message', 'home')
  }
  render() {
    const {data} = this.props;
    return (
      <div className='config-container'>
        <div className='paths'>
          <Table onChange={this.props.onChange} data={data}></Table>
        </div>
        <div className='buttons'>
          <Icon className='icon' onClick={this.onCancel} type="close-circle" />
        </div>
      </div>
    );
  }
}
