import React, { Component } from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import './SelectResult.scss';

class List extends Component {
  render() {
    const {data,selectIndex} = this.props;
    const items = [];
    data.forEach((item,index) => {
      const type = item.value.startsWith('http://') || item.value.startsWith('https://')?'global':'desktop'
      const isSelect = classNames({"is-selected":index === selectIndex,'items':true})
      items.push(<div key={index} className={isSelect}>
        <Icon type={type} className="icon" />
        <div className="text">{item.title}</div>
        <div className="code">{item.code}</div>
      </div>)
    });
    return items;
  }
}


export default class SelectResult extends Component {
  render() {
    return <div className='select-container'>
      <List {...this.props}></List>
    </div>
  }
}