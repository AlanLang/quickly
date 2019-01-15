import React, { Component } from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import './Search.scss';
export default class Search extends Component {
  render() {
    const {timeout,data, select} = this.props;
    let result = ''
    let type = ''
    if(data.length > select){
      result = data[select].title;
      type = data[select].value.startsWith('http://') || data[select].value.startsWith('https://')?'global':'desktop'
    }
    return (
      <div className='search-container'>
        <div className='mainbar'>
          {type?<Icon type={type} className="icon" />:null}
          {result}
        </div>
        <div className={classNames('keycontainer',{'underline':!timeout})}>
          {this.props.keyword}
        </div>
      </div>
    );
  }
}
