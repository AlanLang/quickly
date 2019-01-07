import React, { Component } from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import './Config.scss';
export default class Config extends Component {
  render() {
    const {timeout} = this.props;
    return (
      <div className='config-container'>
        这里是设置页面
        <Button type="primary">Button</Button>
      </div>
    );
  }
}
