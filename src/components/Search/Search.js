import React, { Component } from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import './Search.scss';
export default class Search extends Component {
  render() {
    const {timeout,data} = this.props;
    let result = ''
    let type = ''
    if(data.length > 0){
      result = data[0].title;
      type = data[0].value.startsWith('http://') || data[0].value.startsWith('https://')?'global':'desktop'
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
