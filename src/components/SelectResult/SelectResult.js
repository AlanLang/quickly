import React, { Component } from 'react';
import classNames from 'classnames';
import './SelectResult.scss';

class List extends Component {
  render() {
    const {data,selectIndex} = this.props;
    const items = [];
    data.forEach((item,index) => {
      const isSelect = classNames({"is-selected":index === selectIndex})
      items.push(<div key={index} className={isSelect}>{item.code}</div>)
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