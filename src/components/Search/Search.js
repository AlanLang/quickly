import React, { Component } from 'react';
import classNames from 'classnames';
import './Search.scss';
export default class Search extends Component {
  render() {
    const {timeout,data, select} = this.props;
    let result = ''
    if(data.length > select){
      result = data[select].title;
    }
    return (
      <div className='search-container'>
        <div className='mainbar'>
          {result}
        </div>
        <div className={classNames('keycontainer',{'underline':!timeout})}>
          {this.props.keyword}
        </div>
      </div>
    );
  }
}
